const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  rating: Number,
  address: String,
  open: Number,
  close: Number,
  category: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurants");
