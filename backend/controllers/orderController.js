const asyncHandler = require('express-async-handler');

const Order = require('../models/Order');

// @desc   Get all orders
// @route  GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    res.status(200).json(orders);
});

// @desc   Get orders for single user
// @route  GET /api/orders/:id
// @access Private
const getOrderByUser = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json(orders);
});

// @desc   Get order
// @route  POST /api/orders
// @access Private
const setOrder = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const order = await Order.create({
        text: req.body.text,
        user: req.user.id
    })
});



module.exports = {

    getOrders,
    getOrderByUser,
    setOrder
    //getOrderByRestaurant
    //setOrder
    //getActiveOrders
}