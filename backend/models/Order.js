const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const orderSchema = new mongoose.Schema({

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  id: Number,
  restaurantId: Number,
  userId: Number,
  price: Number,
  dateOrdered: String,
  isActive: Boolean,
  specialInstructions: String,
  menuItems: Array,
  deliverTo: String
});

module.exports = mongoose.model("Order", orderSchema, "orders");