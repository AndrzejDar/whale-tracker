const axios = require("axios");
const cheerio = require("cheerio");
const { Addresses } = require("../models/Addresses");
const { Transaction } = require("../models/Wallet");

// return current transaction list for provided adress
async function scrapeAddressForData(address) {
  // get raw data
  const res = await axios
    .get(`http://bitinfocharts.com/bitcoin/address/${address}-full`)
    .catch((err) => {
      console.log(`FAILED SCRAPING TRANS DATA for addres ${address} - most likely capcha activated`);
      if (err.response) {
        //console.log(err.response.data);
      } else if (err.request) {
        //console.log(err.request);
      } else {
        //console.log("ERROR", err.message);
      }
      return null;
    });

  let sData = [];

  const $ = await cheerio.load(res.data);
  // extract wallet address
  let sAddres = $("h1").children().first().text();
  // extract owner of wallet
  let sOwner = $(".table-striped>tbody>tr>td>small>a").text();

  // extract transaction data from table
  $(".trb").each((el, val) => {
    const sDate = $(val).children().eq(1).text();
    let [sChange] = $(val).children().eq(2).text().split(" ", 1);
    let [tmp, sPrice] = $(val).children().eq(4).text().split("@ $");

    //convert data to correct format
    sAddres = sAddres.replace(/[.]+/g, "");
    sOwner = sOwner.replace("wallet: ", "");
    sChange = sChange.replace(/[,]+/g, "");
    sPrice = sPrice.replace(/[,]+/g, "");

    // create transaction entry
    const trans = new Transaction({
      Date: sDate,
      Change: sChange,
      Price: sPrice,
    });
    sData[el] = trans;
  });

  // compose wallet transaction object to return
  obj = { sAddres, sOwner, sData };
  return obj;
}

// init of current price
let currentPrice = {
  price: 1,
  date: new Date(2000, 1, 1),
};

// returns current scraped asset price(BTC)
async function scrapeForLastPrice() {
  //if current date is old scrape for new
  if (new Date() - currentPrice.date > 3600000) {
    const res = await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD"
      )
      .catch((err) => {
        console.log("couldn't get new current price");
        return currentPrice.price;
      });

    currentPrice = {
      price: res.data.bitcoin.usd,
      date: new Date(),
    };
  }
  return currentPrice.price;
}

async function scrapeAddresses() {
  const counter = 1;
  const data={
    addresses: [],
    lastUpdate: new Date()
  }; 
  for (let i = counter; i < counter + 99; i++) {
    const res = await axios
      .get(
        `https://bitinfocharts.com/top-100-richest-bitcoin-addresses-${i}.html`
      )
      .catch((err) => console.log("site " + i + " failed: " + err));

    const $ = await cheerio.load(res.data);
    $(".table-striped>tbody>tr").each((el,val) => {
      const address = $(val).children().eq(1).children().eq(0).attr('href').split('https://bitinfocharts.com/bitcoin/address/');
      //console.log(address);
      data.addresses.push(address[1]);
    });
  }
  const tmp = await Addresses.findOneAndDelete();
  const newAddresses = new Addresses(data);
  newAddresses.save()
  .catch(err=>console.log(err))
  return data;
}

module.exports = { scrapeForLastPrice, scrapeAddressForData, scrapeAddresses };
