const mongoose = require("mongoose");
//const Transaction = require("./Transaction");
const Schema = mongoose.Schema;



//Create Sub Schema for transaction
const TransactionSchema = new Schema({
  Date:{
      type: Date
  },
  Change:{
      type:Number
  },
  Price:{
      type: Number
  },
});


//Create Schema
const WalletSchema = new Schema({
  addres: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  tokenBalance: {
    type: Number,
  },
  lastUpdate: {
    type: Date,
  },
  aROI: {
    type: Number,
  },
  capex: {
    type: Number,
  },
  capin: {
    type: Number,
  },
  requests: {
    type: Number,
  },
  transactions: [TransactionSchema],
});

const Wallet = mongoose.model("Wallet", WalletSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = {Wallet,Transaction}; 

