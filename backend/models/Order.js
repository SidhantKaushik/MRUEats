const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: Number,
  restaurantId: Number,
  userId: Number,
  price: String,
  dateOrdered: String,
  deliverTo: String,
  isActive: Boolean,
  specialInstructions: String,
  menuItems: Array,
  deliverTo: String
});

module.exports = mongoose.model("Order", orderSchema, "orders");