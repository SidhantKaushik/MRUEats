const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    let id = 1;
    const { firstname, lastname, email, password, password_c } = req.body;

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

    //Creates ID for new user
    const idCheck = await User.find({});
    id += idCheck.length;

    //Create user
    const user = await User.create({
        id: 1,
        firstname: firstname,
        lastname: lastname,
        delivery_loc: "",
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
            province:"Alberta",
            city: "Calgary"
        }
    });

    if (user) {
        res.status(201).json({

            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            delivery_loc: user.deliver_loc,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,

            token: generateToken(id)
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

            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            delivery_loc: user.deliver_loc,
            email: user.email,
            isAdmin: user.isAdmin,
            isCourier: user.isCourier,

            token: generateToken(id)

        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
});

// @desc   Gets user info
// @route  GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
    

    //Check for user email
    const user = await User.find({id: req.params.id});
    console.log("penis");
    console.log(user[0]);

    if (user) {
        res.json({user});
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
});


// @desc   Updates user information
// @route  PUT /api/users/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    
    const { firstname, lastname, email, phone_number, address, postal_code } = req.body;
    
    //Check for user email
    const user = await User.find({email});

    console.log(user);



    // if (user) {
    //     res.json({

    //         firstname: firstname,
    //         lastname: lastname,
    //         email: user.email,
    //         isAdmin: user.isAdmin,
    //         isCourier: user.isCourier,

    //         details:{
    //             address: address,
    //             country: user.details.country,
    //             country_code : user.details.country_code,
    //             phone_number: phone_number,
    //             postal_code: postal_code,
    //             province: user.details.province
    //         },
            
    //         token: generateToken(user.id)

    //     });
    // } else {
    //     res.status(400);
    //     throw new Error('Invalid credentials')
    // }
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
    updateUser,
    getUser,
    //getAdmins,
    //getUserById
}