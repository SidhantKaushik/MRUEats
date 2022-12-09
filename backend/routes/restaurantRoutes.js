const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, addRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');

//Auth middleware to only let authorized users access
const { protect } = require('../middleware/authMiddleware');

//Get all restaurants
router.get('/', getAllRestaurants);
//Get single restaurant
router.get('/:id', getRestaurantById);
//Add a restaurant
router.post('/ADD', addRestaurant, protect);
//Update a restaurant
router.put('/UPDATE', updateRestaurant, protect);
//Delete a restaurant
router.delete('/DELETE', deleteRestaurant, protect);

module.exports = router;