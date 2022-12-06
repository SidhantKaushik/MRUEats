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

// @desc   Adds a new restaurant
// @route  POST /api/restaurants/ADD
// @access Private
const addRestaurant = asyncHandler(async (req, res) => {

    const restaurant = await Restaurant.create({
        id: req.body.id,
        name: req.body.name,
        logo: req.body.logo,
        rating: req.body.rating,
        address: req.body.address,
        open: req.body.open,
        close: req.body.close,
        category: req.body.category
    });

    if(restaurant){

        res.status(201).json({restaurant});

    }
});

// @desc   Updates a restaurant
// @route  PUT /api/restaurants/UPDATE
// @access Private
const updateRestaurant = asyncHandler(async (req, res) => {

    let restToUpdate = await Restaurant.findById({_id: req.body._id});

    if (!restToUpdate) {
        throw new NotFoundError();
    }

    restToUpdate.set({name:req.body.name, logo:req.body.logo, rating:req.body.rating, address:req.body.address, open:req.body.open, close:req.body.close, category:req.body.category});

    await restToUpdate.save();

    res.status(201).json({restToUpdate});
    
});


// @desc   Deletes a restaurant
// @route  DELETE /api/restaurants/DELETE
// @access Private
const deleteRestaurant = asyncHandler(async (req, res) => {

    await Restaurant.findByIdAndDelete(req.body.id,
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted Restaurant : ", docs);
            }
    });
    
});

module.exports = {

    getAllRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant

}