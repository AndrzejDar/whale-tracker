const res = require("express/lib/response");
const { Wallet, Transaction } = require("../models/Wallet");
const { scrapeAddres, scrapeAddres2 } = require("./scrape");

//returns new wallet populated with data
exports.createNewWallet = async function (req) {
  //check if adress is valid

  const wData = await scrapeAddres2(req.params.addres);
  //console.log("ex trans record: " + wData.sData[0]);
  //console.log("przed zapisem do db");
  //console.log("sAdress:"+wData.sAddres + "addres:" +req.params.addres);
  //console.log(wData.sAddres===req.params.addres);

  if (wData.sAddres && wData.sAddres === req.params.addres) {
    console.log("mam dane portfela");

    // const transData = new Transaction({
    //   Date: "",
    //   Change: "",
    //   Price: "",
    // });
    // const transData1 = new Transaction({
    //   Date: "",
    //   Change: "",
    //   Price: "",
    // });
    // const transData2 = [];
    // transData2[0] = transData;
    // transData2[1] = transData1;

    // const transactions = [];
    // wData.sData.forEach((el) => {
    //   const td = new Transaction({
    //     Date: "",
    //     Change: "",
    //     Price: "",
    //   });
    //   transactions.push(td);
    // });
    // console.log(transData2);
    // console.log(transactions);

    console.log("creating new wallet");
    const newWallet = new Wallet({
      addres: req.params.addres,
      owner: wData.sOwner,
      token: "BTC",
      lastUpdate: new Date(),
      requests: 1,
      //transactions: transData2
      transactions: wData.sData,
      //transactions: [],
    });
    //console.log(newWallet);
    newWallet
      .save()
      .then(() => newWallet)
      .catch((err) => {console.log(err);
      res.send(400, "Bad Request - in save to DB");})
  } else console.log("inncorect scraped wallet addres");
};

//save wallet in batches in case of large data
const batchSave=(wallet)=>{
const tW = new Wallet()
}

const checkAddresValidity = () => {};
