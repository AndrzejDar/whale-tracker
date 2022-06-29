const express = require("express");
const router = express.Router();

//Addresses Model
const {Addresses} = require("../../models/Addresses");
//wallet manage
const scrape = require("../../nodejs/scrape");

// @route   GET admin/addresses
// @desc    Get Addresses
// @access  Public
router.get("/addresses/", (req, res) => {
  //console.log(req);
  scrape.scrapeAddresses()
  .then(addresses=>{
    //console.log(addresses);
    res.json(addresses)});
/*
    .then(()=>Addresses.find()
    //.sort({ date: -1 })
    .then((wallet) => {
      res.json(wallet);
    });*/
});



//export default router;
module.exports = router; //not IE6 JS
