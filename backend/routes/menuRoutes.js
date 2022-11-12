const express = require('express');
const router = express.Router();
const {getMenu, getMenuByRestaurant} = require('../controllers/menuController');

router.get('/', getMenu);
router.get('/:restaurant_id', getMenuByRestaurant);

module.exports = router;