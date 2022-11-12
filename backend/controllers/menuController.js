const asyncHandler = require('express-async-handler');

const Menu = require('../models/MenuItem');

// @desc Get menu items
// @route GET /api/menu
// @access Private
const getMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.find();

    res.status(200).json(menu);
});

// @desc Get menu items for single restaurant
// @route GET /api/menu/:id
// @access Private
const getMenuByRestaurant = asyncHandler(async (req, res) => {
    const menu = await Menu.find();

    res.status(200).json(menu);
});

module.exports = {

    getMenu,
    getMenuByRestaurant

}