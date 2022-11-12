const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const orderSchema = new mongoose.Schema({
  
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  id: Number,
  restaurant_id: Number,
  user_id: Number,
  price: Number,
  date_ordered: String,
  isActive: Boolean
});

module.exports = mongoose.model("Order", orderSchema, "orders");