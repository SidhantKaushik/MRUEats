const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    let id = null;
    const { firstname, lastname, email, password, password_c } = req.body;

    console.log(req.body)

    if (!firstname || !lastname || !email || !password || !password_c) {
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
    const idCheck = await User.find({})
    id = idCheck.length + 1

    //Create user
    const user = await User.create({
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        isAdmin: true,
        isCourier: false,
        password_bcrypt: hashedPassword,

        details:{
            address: "",
            country:"Canada",
            country_code:"1",
            phone_number: null,
            postal_code: "",
            province:"Alberta"
        }
    });

    if (user) {
        res.status(201).json({

            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,

            details:{
                address: user.address,
                country: user.country,
                country_code : user.country_code,
                phone_number: user.phone_number,
                postal_code: user.postal_code,
                province: user.province
            },

            token: generateToken(user.id)
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

    if (user && (await bcrypt.compare(password, user.password_bcrypt))) {
        res.json({

            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,

            details:{
                address: user.address,
                country: user.country,
                country_code : user.country_code,
                phone_number: user.phone_number,
                postal_code: user.postal_code,
                province: user.province
            },

            token: generateToken(user.id)

        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
});


// // @desc   Get user data
// // @route  Get /api/users/me
// // @access Private
// const getMe = asyncHandler(async (req, res) => {
//     res.status(200).json(req.user);
// });

//Generate JWT
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

}

// // @desc   Get all users
// // @route  GET /api/users
// // @access Private
// const getUsers = asyncHandler(async (req, res) => {
//     const users = await User.find();

//     res.status(200).json(users);
// });

// // @desc   Get single user
// // @route  GET /api/users/:id
// // @access Private
// const getUserById = asyncHandler(async (req, res) => {
//     const users = await User.find({id: req.params.id});

//     res.status(200).json(users);
// });

// @desc   Get all admins 
// @route  GET /api/users/:isAdmin
// @access Private
 const getAdmins = asyncHandler(async (req, res) => {
     const users = await User.find({isAdmin: true});
     res.status(200).json(users);
 });

module.exports = {
    registerUser,
    loginUser,
    //getMe,
    //getUsers,
    getAdmins,
    //getUserById
}