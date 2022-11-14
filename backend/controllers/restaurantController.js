const asyncHandler = require('express-async-handler');

const Restaurant = require('../models/Restaurant');

// @desc   Get restaurants
// @route  GET /api/restaurants
// @access Private
const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
});

// @desc   Get restaurant by id
// @route  GET /api/restaurants/:id
// @access Private
const getRestaurantById = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
});

module.exports = {

    getAllRestaurants,
    getRestaurantById

}