const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB

const userSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  delivery_loc: String,
  email: String,
  isAdmin: Boolean,
  isCourier: Boolean,
  password_bcrypt: String,
  
  details: {
    address: String,
    country: String,
    country_code : Number,
    phone_number: String,
    postal_code: String,
    province: String,
    city: String
  }
  
});

module.exports = mongoose.model("User", userSchema, "users");
