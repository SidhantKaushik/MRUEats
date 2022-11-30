const express = require('express');
const router = express.Router();
const { getOrders, getOrderByUser, setOrder } = require('../controllers/orderController');

//Add admin protection for all orders
const { protect } = require('../middleware/authMiddleware');

//Can chain GET and PUT in one line

router.route('/all').get(getOrders);
router.route('/').get(protect, getOrders).post(protect, setOrder);
router.get('/:id', protect, getOrderByUser);


module.exports = router;