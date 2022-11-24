const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  restaurant_id: Number,
  category: String
  
});

module.exports = mongoose.model("Menu Item", menuItemSchema, "menuItems");