const express = require('express');
const router = express.Router();
const { getOrders, getOrderByUser, setOrder, getActiveOrders, getCompleteOrders, deactivateOrder } = require('../controllers/orderController');

//Auth middleware to only let authorized users access
const { protect } = require('../middleware/authMiddleware');

//Get a single user's order
router.get('/:id', getOrderByUser, protect);
//Get active orders
router.route('/active').get(getActiveOrders, protect);
//Get completed orders
router.route('/complete').get(getCompleteOrders, protect);
//Update order status to not active
router.route('/DEACTIVATE').put(deactivateOrder, protect);
//Post a new order to the database
router.post('/post', setOrder, protect);
//Get all orders
router.route('/').get(getOrders, protect)


module.exports = router;