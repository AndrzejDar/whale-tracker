const axios = require("axios");
const cheerio = require("cheerio");
const { Transaction } = require("../models/Wallet");

function scrapeAddres(addres) {
  //get html from site
  axios
    .get(`https://bitinfocharts.com/bitcoin/address/${addres}-full`)
    .then((res) => {
      let obj = {};
      let sData = [];
      //extract header data
      const $ = cheerio.load(res.data);
      const sAddres = $("h1").children().first().text();
      const sOwner = $(".table-striped>tbody>tr>td>small>a").text();
      //extract transaction data
      $(".trb").each((el, val) => {
        const sDates = $(val).children().eq(1).text();
        const [sChange] = $(val).children().eq(2).text().split(" ", 1);
        const [tmp, sPrice] = $(val).children().eq(4).text().split("@");

        sData[el] = { sDates, sChange, sPrice };
      });
      obj = { sAddres, sOwner, sData };
      return obj;
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("ERROR", err.emessage);
      }
      console.log("przed returnem2");
      return null;
    });
}

async function scrapeAddres2(addres) {
  const res = await axios
    .get(`https://bitinfocharts.com/bitcoin/address/${addres}-full`)
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("ERROR", err.emessage);
      }
      console.log("przed returnem2");
      return null;
    });

  //let obj = {};
  let sData = [];

  const $ = await cheerio.load(res.data);
  let sAddres = $("h1").children().first().text();
  let sOwner = $(".table-striped>tbody>tr>td>small>a").text();

  $(".trb").each((el, val) => {
    const sDate = $(val).children().eq(1).text();
    let [sChange] = $(val).children().eq(2).text().split(" ", 1);
    let [tmp, sPrice] = $(val).children().eq(4).text().split("@ $");

    //convert data to correct format
    sAddres = sAddres.replace(/[.]+/g, "");
    sOwner = sOwner.replace("wallet: ","");
    sChange = sChange.replace(/[,]+/g, "");
    sPrice = sPrice.replace(/[,]+/g, "");
    //console.log(sChange);

    //sData[el] = {Date: sDates, Change:sChange.replace(/[,]+/g,""), Price: sPrice.replace(/[,]+/g,"") };
    const trans = new Transaction({
      Date: sDate,
      Change: sChange,
      Price: sPrice,
    });
    sData[el] = trans;
  });
  //console.log(sData);
  obj = { sAddres, sOwner, sData };
  return obj;
}

module.exports = { scrapeAddres, scrapeAddres2 };
