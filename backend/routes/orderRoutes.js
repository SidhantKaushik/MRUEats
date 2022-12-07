const express = require('express');
const router = express.Router();
const { getOrders, getOrderByUser, setOrder, getActiveOrders, getCompleteOrders, deactivateOrder } = require('../controllers/orderController');

//Add admin protection for all orders
const { protect } = require('../middleware/authMiddleware');

//Can chain GET and PUT in one line

router.route('/all').get(getOrders);
router.route('/active').get(getActiveOrders);
router.route('/complete').get(getCompleteOrders);
router.route('/DEACTIVATE').put(deactivateOrder);
router.route('/').get(protect, getOrders).post(protect, setOrder);
router.get('/:id', getOrderByUser, protect);


module.exports = router;