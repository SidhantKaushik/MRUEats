const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, addRestaurant } = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', addRestaurant);

module.exports = router;