const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, addRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/ADD', addRestaurant);
router.put('/UPDATE', updateRestaurant);
router.delete('/DELETE', deleteRestaurant);

module.exports = router;