import { connect } from "react-redux";
import React from "react";

const WalletStats = ({
  addres,
  balance,
  capex,
  capin,
  lastPrice,
  firstActivity,
}) => {
  console.log(addres);

  const AROI = () => {
    const ROI = (lastPrice * balance - capex + capin) / capex;
    const first = new Date(
      firstActivity.slice(6, 10),
      firstActivity.slice(3, 5),
      firstActivity.slice(0, 2)
    );
    const n = (first-new Date()) / 86400000 / 365;
    console.log(first+10000000000);
    console.log(new Date()+100000);
    console.log(new Date() - first);
    console.log((lastPrice * balance)+capin);
    console.log(((lastPrice * balance)+capin) / capex);
    console.log("N w dniach: "+n*365);
    console.log(Math.pow(((lastPrice * balance)+capin) / capex, 1 / n));
    return [((Math.pow(((lastPrice * balance)+capin) / capex, 1 / n) - 1)*100),ROI];
    //return [(Math.pow(1 + ROI, 1 / n) - 1) * 100,ROI];
  };

  if (balance && lastPrice) {
    return (
      <div>
        <h2>{addres}</h2>
        <ul>
          <li>wallet balance(BTC): {balance.toFixed(2)}</li>
          <li>wallet value(USD): {(balance * lastPrice).toFixed(2)}</li>
          <li>capital expense(USD): {capex.toFixed(2)}</li>
          <li>capital income(USD): {capin.toFixed(2)}</li>
          <li>return od investment ROI: {AROI()[1].toFixed(2)}%</li>
          <li>annualized ROI: {AROI()[0].toFixed(2)}%</li>
        </ul>
      </div>
    );
  } else return <></>;
};

const mapStateToProps = (state) => {
  const data = state.wallet.wallet;
  return {
    addres: data.addres,
    balance: data.balance,
    capex: data.capex,
    capin: data.capin,
    lastPrice: data.priceData.prices
      ? data.priceData.prices[data.priceData.prices.length - 1]
      : 0,
    firstActivity: data.priceData.dates ? data.priceData.dates[0] : 0,
  };
};

export default connect(mapStateToProps)(WalletStats);
