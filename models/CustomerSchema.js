const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the Customer)
const customerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobileNumber: String,
  gender: String,
  age: String,
  country: String,
});
 
 
// Create a model based on that schema
const Customer = mongoose.model("Customer", customerSchema);
 
 
// export the model
module.exports = Customer;