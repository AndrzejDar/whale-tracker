const express = require("express");
const router = express.Router();
//const auth = require('../../middleware/auth');

//List Model
const {List} = require("../../models/List");
const {Wallet} = require("../../models/Wallet");

// @route   GET api/top/balance
// @desc    Get list of top balance
// @access  Public
router.get('/balance', (req, res) => {
    // console.log(req);
  // List
  //   .find({name: "balance"})
  //   .then((items) => res.json(items))
  Wallet
    .find({})
    .sort({tokenBalance:'desc'})
    .then(items=>res.json(items.slice(0,100)))
});

// @route   GET api/top/aROI
// @desc    Get list of top annualizedROI wallets
// @access  Public
router.get('/aROI', (req, res) => {
    // console.log(req);
  Wallet
    .find({})
    .sort({aROI: 'desc'})
    .then((items) => res.json(items.slice(0,100)))
});





//export default router;
module.exports = router; //not IE6 JS
