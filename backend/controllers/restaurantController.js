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
    const restaurants = await Restaurant.find({id: req.params.id});

    res.status(200).json(restaurants);
});

// @desc   Add restaurant 
// @route  POST /api/restaurants/
// @access Private
const addRestaurant = asyncHandler(async (req, res) => {
    const { logo, name, rating, address, open, close, category } = req.body;

    //Create restaurant
    const restaurant = await Restaurant.create({
        id: 1,
        logo: logo,
        name: name,
        rating: rating,
        address: address,
        open: open,
        close: close,
        category: category
    });

    if (restaurant) {
        res.status(201).json({
            _id: restaurant.id,
            logo: restaurant.logo,
            name: restaurant.name,
            rating: restaurant.rating,
            address: restaurant.address,
            open: restaurant.open,
            close: restaurant.close,
            category: restaurant.category,
        });
    } else {
        res.status(400);
        throw new Error('Invalid restaurant data');
    }
    res.status(200);
});

module.exports = {

    getAllRestaurants,
    getRestaurantById,
    addRestaurant,

}