const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define the schema that maps the structure of the data in mongoDB
const userSchema = new mongoose.Schema({
  id: Number,
  details: {
    firstname: String,
    lastname: String,
    email: String,
    //Maybe number
    phone_number: String,
    postal_code: String,
    isAdmin: Boolean,
  },
  password_bcrypt: String,
  apikey: String,
  orders: Array
});

// We'll use this later on to check if user has the correct credentials.
// Can't be arrow syntax because need 'this' within it
userSchema.methods.isValidPassword = async function (formPassword) {
  const user = this;
  const hash = user.password_bcrypt;
  // Hashes the password sent by the user for login and checks if the
  // digest stored in the database matches the one sent. Returns true
  // if it does else false.
  const compare = await bcrypt.compare(formPassword, hash);
  return compare;
};
module.exports = mongoose.model("User", userSchema, "users");
