const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  restaurantId: Number,
  category: String
});

module.exports = mongoose.model("Menu Item", menuItemSchema, "menuItems");