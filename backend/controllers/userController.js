const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');


// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    let id = 1;
    const { firstName, lastName, email, deliverTo, checked, password, password_c } = req.body;

    if (!firstName || !lastName || !email || !deliverTo || !password || !password_c) {
        res.status(400);
        throw new Error('Please add all fields');
    };

    //Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creates ID for new user
    const idCheck = await User.find({});
    id += idCheck.length;

    //Create user
    const user = await User.create({
        id: id,
        firstName: firstName,
        lastName: lastName,
        deliverTo: deliverTo,
        email: email,
        isAdmin: false,
        isCourier: checked,
        password_bcrypt: hashedPassword,

        details: {
            address: "",
            country: "Canada",
            countryCode: 1,
            phoneNumber: "",
            postalCode: "",
            province: "AB",
            city: "Calgary"
        }
    });

    if (user) {
        res.status(201).json('User created!');
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc   Authenitcate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    //Check for user email
    const user = await User.findOne({ email });
    if (user && await (bcrypt.compare(password, user.password_bcrypt))) {
        res.json({

            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            deliverTo: user.deliverTo,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,

            token: generateToken(user.id)

        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc   Gets user info
// @route  GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    //Check for user email
    const user = await User.findOne({ id });
    if (user) {
        res.json({ user });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
});

// @desc   Updates user information
// @route  PUT /api/users/UPDATE
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.body._id);
    //Check for user email
    const user = await User.findByIdAndUpdate(_id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        deliverTo: req.body.deliverTo,

        details: {
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            postalCode: req.body.postalCode,
            countryCode: req.body.countryCode,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country
        }

    })
    if (user) {
        res.status(201).json({

            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            deliverTo: user.deliverTo,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,
            token: generateToken(user.id)


        });
    } else {
        res.status(400);
        throw new Error('Error updating user');
    }
});

//Generate JWT
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

}

// @desc   Get all admins 
// @route  GET /api/users/:isAdmin
// @access Private
const getAdmins = asyncHandler(async (req, res) => {
    const users = await User.find({ isAdmin: true });
    res.status(200).json(users);
});

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    getAdmins,
    getUsers,
}