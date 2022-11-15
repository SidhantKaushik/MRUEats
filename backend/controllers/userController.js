const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
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

    //Create user
    const user = await User.create({
        id: 1,
        firstname: firstname,
        lastname: lastname,
        email: email,
        isAdmin: false,
        password_bcrypt: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
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

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
});


// @desc   Get user data
// @route  Get /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

//Generate JWT
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

}

// @desc   Get all users
// @route  GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
});
/*
// @desc   Get single user
// @route  GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
});

// @desc   Get all admins 
// @route  GET /api/users/:isAdmin
// @access Private
const getAdmins = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}); */

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    /*getUserById,
    getAdmins */
}