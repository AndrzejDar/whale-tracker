import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {setWalletStats} from '../actions/walletActions'

function WalletTransactions({transData,setWalletStatsDis}) {
const revTransData = [...transData].reverse();
//const [transData2,changeTransData] = useState([]);


// useEffect(()=>{

// },[transData2])
const startDate = new Date(revTransData[0].Date);
console.log("start date: "+ startDate+"  from" + revTransData[0].Date);
//console.log("first date in revtrans: " +startDate);
//console.log("first date in trans: " +transData[0].Date);
let balance= 0;
let prevBalance= 0;
let capex= 0;
let capin =0;


const calculateInvestmentParams=(trans)=>{
balance = balance+trans.Change;
if(trans.Change>0)
capex = capex+(trans.Change*trans.Price);
else
capin = capin+(-trans.Change*trans.Price);
}

const AROI=(trans)=>{
  const ROI = (trans.Price*balance-capex+capin)/capex;
  const n =(new Date(trans.Date)-startDate)/86400000/365;
  //console.log("1+"+ROI+"to pow  1/"+n+" = "+Math.pow(1+ROI,1/n));
 return (Math.pow(1+ROI,1/n)-1)*100;
}

const setWalletStats=()=>{
  const stats= {
    balance: balance,
    capex: capex,
    capin: capin
  };
  console.log(stats);
  console.log("before dispatching set stats");
  setWalletStatsDis(stats);
}


const calcBalance=()=>{
prevBalance=balance;
}

  return (
    <table><thead><tr>
        <th>date</th>
        <th>price</th>
        <th>change</th>
        <th>% change</th>
        <th>balance(btc)</th>
        <th>value</th>
        <th>capital expense</th>
        <th>capital income</th>
        <th>ROI</th>
        <th>AROI</th>
        </tr>
        </thead><tbody>
    {revTransData.map((trans,ID)=>(<tr key={ID} style={{color: trans.Change
      <0?"red":"green"}}>
      {calculateInvestmentParams(trans)}
        <td>{(new Date(trans.Date)).toLocaleDateString()}</td>
        <td>{trans.Price}</td>
        <td>{trans.Change.toFixed(2)}</td>
        <td>{trans.Change/prevBalance<-1000?"NA":(trans.Change/prevBalance).toFixed(2)}</td>
        <td>{balance.toFixed(2)}</td>
        <td>{(trans.Price*balance).toFixed(2)}</td>
        <td>{capex.toFixed(2)}</td>
        <td>{capin.toFixed(2)}</td>
        <td>{((trans.Price*balance-capex+capin)/capex*100).toFixed(2)}%</td>
        <td>{AROI(trans).toFixed(2)}%</td>
        {calcBalance()}
        

    </tr>)).reverse()}
    {setWalletStats()}
    </tbody>
    </table>
  )
}


const mapDispatchToProps=(dispatch)=>({
  setWalletStatsDis: (stats)=>dispatch(setWalletStats(stats)),
})


export default connect(null,mapDispatchToProps)(WalletTransactions)