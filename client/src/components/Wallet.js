import React, { useEffect } from 'react';
import { connect } from "react-redux";
import WalletTransactions from "./WalletTransactions";
import WalletBalance from "./WalletBalance";
import WalletStats from "./WalletStats";
import { getWallet } from '../actions/walletActions';

function Wallet({wallet,getWallet}) {

//if no wallet data loaded or loading, load defaul wallet
  useEffect(() => {
    if(!wallet.wallet._id && !wallet.loading)getWallet();    
  }, [])
  

  return (
    <div>
    {wallet.wallet._id &&        
    !wallet.loading ? (
      <>
      {wallet.wallet.priceData?<WalletStats />:"LOADING DATA"}
        
        <WalletBalance
          transData={wallet.wallet.transactions}
          token={wallet.wallet.token}
        />
        <WalletTransactions
          transData={wallet.wallet.transactions}
        />
      </>
    ) : (      
      "LOADING DATA"         
    )}
  </div>
  )
}


const mapStateToProps = (state) => ({
    wallet: state.wallet,
    //isAuthenticated: state.auth.isAuthenticated,
  });  

  const mapDispatchToProps = (dispatch) =>{
    //setup for int wallet load
    const defWall = "1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ";
    return {
    getWallet: ()=>{dispatch(getWallet(defWall))}
  }
}
  export default connect(mapStateToProps,mapDispatchToProps)(Wallet);





