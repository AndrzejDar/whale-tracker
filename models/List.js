const mongoose = require("mongoose");
const { Wallet } = require("./Wallet");
const Schema = mongoose.Schema;



//Create Sub Schema for record in list
const ListEntrySchema = new Schema({
    wallet_id:{
        type: Schema.ObjectId,
        ref: Wallet,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
    age:{
        type: Number,
        required: true
    }
  });


//Create Schema
const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  description: {
    type: String,
    required: false,
    
  },
  list: {
    type: [ListEntrySchema],
    required: false,
  },
  last_update_date: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model('List', ListSchema);
const ListEntry = mongoose.model('ListEntry', ListEntrySchema);
module.exports = {List, ListEntry}
