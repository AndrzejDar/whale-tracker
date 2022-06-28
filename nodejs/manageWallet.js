const { default: axios } = require("axios");
const res = require("express/lib/response");
const { Wallet, Transaction } = require("../models/Wallet");
const { List, ListEntry } = require("../models/List");
const { scrapeAddres, scrapeAddres2 } = require("./scrape");
const { listeners } = require("../models/Item");

let currentPrice = {
  price: 1,
  date: new Date(2000, 1, 1),
};

async function getLastPrice() {
  //console.log(new Date() - currentPrice.date);

  if (new Date() - currentPrice.date > 3600000) {
    const res = await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD"
      )
      .catch((err) => {
        console.log("couldn't get new current price");
        return currentPrice.price;
      });
    //console.log("Got new current Price: " + res.data.bitcoin.usd);
    currentPrice = {
      price: res.data.bitcoin.usd,
      date: new Date(),
    };
    return currentPrice.price;
  }
  return currentPrice.price;
}

const calculateWalletStats = async (transactions, price) => {
  let balance = 0;
  let capex = 0;
  let capin = 0;

  transactions.forEach((el) => {
    balance = balance + el.Change;
    if (el.Change > 0) capex = capex + el.Change * el.Price;
    else capin = capin + -el.Change * el.Price;
  });
  //console.log(balance + "+" + capex + "+" + capin);
  //console.log(price);
  const ROI = (price * balance - capex + capin) / capex;
  const n =
    (new Date() - transactions[transactions.length - 1].Date) / 86400000 / 365;
  //console.log(ROI + " + " + n);
  const aROI = (Math.pow(1 + ROI, 1 / n) - 1) * 100;
  //console.log("returning complet wallet stats");
  return {
    tokenBalance: balance,
    aROI: aROI,
    capex: capex,
    capin: capin,
  };
};

exports.getWallet = async function (req) {
  const wal = await Wallet.findOne({ addres: req.params.addres });
  //console.log("found wallet adres is:" + wal.addres);

  if (wal) {
    const currDate = new Date();
    //diffrence in days
    const diff = currDate.getTime() - wal.lastUpdate.getTime() / 86400000;
    //update wallet if older than 10 days
    if (diff > 10) {
      console.log("returning updated wallet");
      const res = await updateWallet(req);
      return res;
    } else {
      console.log("returning existing wallet");
      return wal;
    }
  } else {
    console.log("creating new wallet");
    const newWalletData = await createNewWallet(req);
    const newWallet = new Wallet(newWalletData);
    console.log(newWalletData);

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
    newWallet.save().then(res=>console.log(res)).catch(err=>console.log(err));
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

  const wData = await scrapeAddres2(req.params.addres);
  const lastPrice = await getLastPrice();

  if (wData.sAddres && wData.sAddres === req.params.addres) {
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

//create list entry
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
