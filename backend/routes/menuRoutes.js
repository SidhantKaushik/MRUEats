const express = require('express');
const router = express.Router();
const { getMenu, getMenuByRestaurant, addMenu, updateMenu, deleteMenu} = require('../controllers/menuController');

router.get('/', getMenu);
router.get('/:restaurant_id', getMenuByRestaurant);
router.post('/ADD', addMenu);
router.put('/UPDATE', updateMenu);
router.delete('/DELETE', deleteMenu);

module.exports = router;