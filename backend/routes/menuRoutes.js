const express = require('express');
const router = express.Router();
const { getMenu, getMenuByRestaurant, addMenu, updateMenu, deleteMenu} = require('../controllers/menuController');

router.get('/', getMenu);
router.get('/:restaurantId', getMenuByRestaurant);
router.post('/ADD', addMenu);
router.route('/UPDATE').put(updateMenu);
router.route('/DELETE').delete(deleteMenu);

module.exports = router;