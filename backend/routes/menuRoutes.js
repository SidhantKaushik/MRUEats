const express = require('express');
const router = express.Router();
const { getMenu, getMenuByRestaurant } = require('../controllers/menuController');

router.get('/', getMenu);
router.get('/:restaurantId', getMenuByRestaurant);

module.exports = router;