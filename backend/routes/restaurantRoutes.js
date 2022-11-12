const express = require('express');
const router = express.Router();
const {getAllRestaurants, getRestaurantById} = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

module.exports = router;