import axios from "axios";
import React, { useEffect, useState } from "react";
import DrawChart from "./DrawChart";

function WalletBalance({ transData, token }) {
  const [d1, changeD1] = useState({});

  useEffect(async() => {
      const tmp = await getTokenPrices(token, d2.dates[0]);
    changeD1(tmp);

  }, []);

useEffect(()=>{    
},[d1]);


  let a = [];
  let b = [];
  transData.forEach((el) => {
    let date = new Date(el.Date);
    date = date.toLocaleDateString();
    a.push(date);
    b.push(el.Change);
  });
  a.reverse();
  b.reverse();

  //compound change to acttual balance
  let tmp = 0;
  let arr = [];
  b.forEach((el) => {
    arr.push(tmp + el);
    tmp = tmp + el;
  });
  b = arr;

  let d2 = { dates: a, balances: b};
  //console.log(d2.balances);

  
  //console.log(d1);

  async function getTokenPrices(token, startDate) {
    let currD = new Date();
    currD = currD.toLocaleDateString();
    //console.log("daty na bazie których bobieram cene "+currD + " pierwszej transakcji" + startDate);
    if(startDate[1]===".")startDate=0+startDate;
    //console.log("start date" + startDate);
    //console.log(startDate.substring(3,5)+"."+startDate.substring(0,2)+"."+startDate.substring(6,10));
    const tmpd = new Date(startDate.substring(3,5)+"."+startDate.substring(0,2)+"."+startDate.substring(6,10));
    //console.log("tmpd " +tmpd);
    const currDate = new Date();
    const diff = ((currDate - tmpd) / 86400000);
    //console.log(diff);

    const res = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${diff}`
      )
      .catch((err) => console.log(err));
    //console.log(res.data.prices);
    let dates = [];
    let prices = [];
    res.data.prices.forEach((el) => {
      dates.push(new Date(el[0]).toLocaleDateString());
      prices.push(el[1]);
    });
    //console.log("got first date:" +dates[0]);
    return { dates: dates, prices: prices };
  }

  return (
    <>{d1.prices?
      <DrawChart d1={d1} d2={d2} />:<></>}
    </>
  );
}

export default WalletBalance;
