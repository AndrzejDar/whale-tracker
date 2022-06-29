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
// @desc    Get Wallet of specific address
// @access  Public
router.get("/:addres", async (req, res) => {
  const ret= await manageWallet.getWallet(req);
  return await res.json(ret);

  // manageWallet.getWallet(req)
  // .then(wall=>{  
  //   console.log("zwrócony wallet:"+ wall);
  //   res.json(wall)
  // })


  // Wallet.find({ addres: req.params.addres })
  //   .then((wallet) => {
  //     //console.log("server got item:", wallet);
  //     if (wallet.length > 0) {
  //       console.log("found wallet and returning it");

  //       //update wallet
  //       return res.json(wallet);
  //     } else {
  //       console.log("didnt found wallet, trying to create one");        
  //       return res.json(manageWallet.getWallet(req));
  //       //res.json(createNewWallet2(req.params.addres));
  //     }
  //   })
  //   .catch((err) => console.log(err));
});


// @route   GET api/aROI
// @desc    Get Wallet of aroi greater
// @access  Public
router.get("/:aroi", (req, res) => {
  console.log("requesting adresses witrh aROI greater than "+req.params.aroi);
  Wallet.find({ aROI: {$gt: req.params.aroi } })
    .then((wallet) => {
      //console.log("server got item:", wallet);
      if (wallet.length > 0) {
        console.log("found wallets of aroi and returning them");
        return res.json(wallet);
      } else {
        console.log("didnt found wallet witch aROI");        
        return res.json({});
        //res.json(createNewWallet2(req.params.addres));
      }
    })
    .catch((err) => console.log(err));
});

//export default router;
module.exports = router; //not IE6 JS
