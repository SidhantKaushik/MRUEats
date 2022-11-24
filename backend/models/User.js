const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const userSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  email: String,
  isAdmin: Boolean,
  isCourier: Boolean,
  password_bcrypt: String,
  
  details: {
    address: String,
    country: String,
    country_code : Number,
    phone_number: Number,
    postal_code: String,
    province: String
  }
  
});

module.exports = mongoose.model("User", userSchema, "users");
