const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create Schema
const AddressesSchema = new Schema({
  addresses: {
    type: Array,
    required: true,
    unique: true,
  },
  lastUpdate: {
    type: Date,
  }
});

const Addresses = mongoose.model("Addresses", AddressesSchema);
module.exports = {Addresses}; 

