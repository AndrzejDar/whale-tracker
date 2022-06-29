const { default: axios } = require("axios");
//const res = require("express/lib/response");
const { Wallet, Transaction } = require("../models/Wallet");
const { List, ListEntry } = require("../models/List");
const { scrapeForLastPrice, scrapeAddressForData } = require("./scrape");
const { listeners } = require("../models/Item");


//calculate wallet statistics
const calculateWalletStats = async (transactions, price) => {
  let balance = 0;
  let capex = 0;
  let capin = 0;

  transactions.forEach((el) => {
    //callculate wallet ballance (asset quantity)
    balance = balance + el.Change;

    //increase capital expenditure if asset bought or increase capital gain (income) if asset sold
    if (el.Change > 0) capex = capex + el.Change * el.Price;
    else capin = capin + -el.Change * el.Price;
  });

  //calculate ROI
  const ROI = (price * balance - capex + capin) / capex;

  //callculate annualized ROI
  const n =(transactions[transactions.length - 1].Date -new Date()) / 86400000 / 365;
  const aROI = (Math.pow(((price*balance)+capin)/capex, 1 / n) - 1);

 
  return {
    tokenBalance: balance,
    aROI: aROI,
    capex: capex,
    capin: capin,
  };
};


//returns requested wallet - creates new / updates old / sent existing
exports.getWallet = async function (req) {

  //find wallet
  const wal = await Wallet.findOne({ addres: req.params.addres });

  // if exists check if up to date
  if (wal) {

    //update wallet if older than 10 days
    const currDate = new Date();    
    const diff = (currDate.getTime() - wal.lastUpdate.getTime()) / 86400000;
    console.log('wiek portfela:  ' + diff);
    if (diff > 10) {
      console.log("returning updated wallet");
      const res = await updateWallet(req);
      return res;
    } else {
      console.log("returning existing wallet");
      return wal;
    }
  } else {
    console.log("Requested wallet don't exist. Creating one...");
    const newWalletData = await createNewWallet(req);
    const newWallet = new Wallet(newWalletData);
    //console.log(newWalletData);

    // newWallet
    //   .save(err=>{
    //     if(err){
    //       console.log(err);
    //       return( res.status(400).json({msg: "error message"}))
    //   }else{
    //     return newWallet
    //   }
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //     return( res.status(400).json({msg: "error message2"}))
    //   })

    // try{
    // const wal = await newWallet
    //   .save();
    //     res.status(200).json({wal})
    //   }
    //   catch(err){
    //     console.log(err);
    //     res.status(400).send({msg: "error message2"})
    //   }


    // await newWallet
    //   .save()
    //   .then(() =>newWallet)
    //   .catch((err) => {
    //     res.send(400, "unable to save new Wallet to DB");
    //   });

    // await newWallet
    //   .save()
    //   .then(() =>newWallet)
    //   .catch((err) => {
    //     res.send(400, "unable to save new Wallet to DB");
    //   });

    // Wallet.updateOne({addres: req.params.addres}, newWalletData).then(res=>console.log(res)).catch(err=>console.log(err));

    newWallet
      .save()
      .catch(err=>console.log(err));//wtf?
    return newWallet;
  }
};

const updateWallet = async (req) => {
  const updatedWallet = await createNewWallet(req);
  return (wal = await Wallet.findOneAndUpdate(
    { addres: req.params.addres },
    updatedWallet,
    { new: true }
  ));
};

//returns new wallet object populated with data
const createNewWallet = async function (req) {
  //check if adress is valid

  const wData = await scrapeAddressForData(req.params.addres);
  const lastPrice = await scrapeForLastPrice();

  if (wData.sAddres) {
    //console.log("creating new wallet");
    const walletStats = await calculateWalletStats(wData.sData, lastPrice);
    const newWallet = {
      addres: req.params.addres,
      owner: wData.sOwner,
      token: "BTC",
      tokenBalance: walletStats.tokenBalance,
      lastUpdate: new Date(),
      aROI: walletStats.aROI,
      capex: walletStats.capex,
      capin: walletStats.capin,
      requests: 1,
      transactions: wData.sData, // problem w zapisie tego!!!!!!!!!!!!!
    };
    return newWallet;
  } else console.log("inncorect scraped wallet addres");
};

//create list entry -- not used
const addToLists = (wallet) => {
  //add wallet to balance list
  const listEntry = new ListEntry(
    {
      wallet_id: wallet._id,
      value: wallet.tokenBalance,
      age: wallet.transactions[0].Date,
    },
    { collection: "lists" }
  );
  List.findOneAndUpdate(
    { name: "balance" },
    { $push: { list: listEntry } },
    { new: true }
  );

  console.log("saved to list collection");
};
