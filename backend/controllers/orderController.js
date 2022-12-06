const asyncHandler = require('express-async-handler');

const Order = require('../models/Order');

// @desc   Get all orders
// @route  GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    res.status(200).json(orders);
});

// @desc   Get all active orders
// @route  GET /api/orders/active
// @access Private
const getActiveOrders = asyncHandler(async (req, res) => {
    const activeOrders = await Order.find({ isActive: true });

    res.status(200).json(activeOrders);
});

// @desc   Get all complete orders
// @route  GET /api/orders/complete
// @access Private
const getCompleteOrders = asyncHandler(async (req, res) => {
    const completeOrders = await Order.find({ isActive: false });

    res.status(200).json(completeOrders);
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

// @desc   sets orders "isActive" to false
// @route  PUT /api/orders/DEACTIVATE
// @access Private
const deactivateOrder = asyncHandler(async (req, res) => {

    let orderToUpdate = await Order.findById({_id: req.body._id});

    if (!orderToUpdate) {
        throw new NotFoundError();
    }

    orderToUpdate.set({isActive:"false"});
    await orderToUpdate.save();

});

module.exports = {

    getOrders,
    getOrderByUser,
    setOrder,
    getActiveOrders,
    getCompleteOrders,
    deactivateOrder
    //getOrderByRestaurant
    //setOrder
    //getActiveOrders
}