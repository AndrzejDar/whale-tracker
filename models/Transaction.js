const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema -- not used in current itteration
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
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
