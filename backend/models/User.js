const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB

const userSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  deliverTo: String,
  email: String,
  isAdmin: Boolean,
  isCourier: Boolean,
  password_bcrypt: String,
  
  details: {
    address: String,
    country: String,
    countryCode : Number,
    phoneNumber: String,
    postalCode: String,
    province: String,
    city: String
  }
  
});

module.exports = mongoose.model("User", userSchema, "users");
