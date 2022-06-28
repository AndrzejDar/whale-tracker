import React, { useEffect } from 'react';
import { connect } from "react-redux";
import WalletTransactions from "./WalletTransactions";
import WalletBalance from "./WalletBalance";
import WalletStats from "./WalletStats";

function Wallet({wallet,getWallet}) {

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
  export default connect(mapStateToProps)(Wallet);





