const express = require('express');
const router = express.Router();
const { getMenu, getMenuByRestaurant, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');

//Get all menu items
router.get('/', getMenu);
//Get menu of a single restaurant
router.get('/:restaurantId', getMenuByRestaurant);
//Add a menu item
router.post('/ADD', addMenu);
//Update a menu item
router.route('/UPDATE').put(updateMenu);
//Delete a menu item
router.route('/DELETE').delete(deleteMenu);

module.exports = router;