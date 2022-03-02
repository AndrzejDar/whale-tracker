const express = require("express");
const router = express.Router();

//wallet Model
const {Wallet} = require("../../models/Wallet");
//wallet manage
const manageWallet = require("../../nodejs/manageWallet");

// @route   GET api/wallets
// @desc    Get Wallets
// @access  Public
router.get("/", (req, res) => {
  //console.log(req);
  Wallet.find()
    //.sort({ date: -1 })
    .then((wallet) => {
      res.json(wallet);
    });
});

// @route   GET api/wallets
// @desc    Get Wallet of specific adres
// @access  Public
router.get("/:addres", (req, res) => {
  console.log(req.params.addres);
  Wallet.find({ addres: req.params.addres })
    .then((wallet) => {
      //console.log("server got item:", wallet);
      if (wallet.length > 0) {
        console.log("found wallet and returning it");
        return res.json(wallet);
      } else {
        console.log("didnt found wallet, trying to create one");        
        return res.json(manageWallet.createNewWallet(req));
        //res.json(createNewWallet2(req.params.addres));
      }
    })
    .catch((err) => console.log(err));
});



function createNewWallet2(addres) {
  console.log("creating new wallet");
  const newWallet = new Wallet({
    addres: addres,
    token: "BTC",
  });
  console.log(newWallet);
  newWallet
    .save()
    .then(() => newWallet)
    .catch((err) => console.log(err));
}

//export default router;
module.exports = router; //not IE6 JS
