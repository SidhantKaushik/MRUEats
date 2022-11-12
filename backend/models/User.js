const mongoose = require("mongoose");

//Define the schema that maps the structure of the data in mongoDB
const userSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  email: String,
    //Maybe number
 /*    phone_number: String,
    postal_code: String, */
  isAdmin: Boolean,
  password_bcrypt: String,
/*   apikey: String,
  orders: Array */
});

module.exports = mongoose.model("User", userSchema, "users");
