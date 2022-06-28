import React, { Component, useEffect, useState } from "react";
import { getWallet } from "../actions/walletActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WalletTransactions from "./WalletTransactions";
import WalletBalance from "./WalletBalance";
import WalletStats from "./WalletStats";
// import WalletSearch from "./WalletSearch";

class Wallet extends Component {
  static propTypes = {
    getWallet: PropTypes.func.isRequired,
    wallet: PropTypes.object.isRequired,
    // isAuthenticated: PropTypes.bool
  };
  // const [wallet,changeWallet] = useState();

  componentDidMount() {
    console.log("wallet mount"); 
  }

  render() {
    //console.log(this.props.wallet.wallet[0].token);
    //return <div>walllettt data: {this.props.loading?"loading":this.props.wallet.loading}</div>;
    //console.log(this.props.wallet.wallet[0] ? "true" : "false");
    return (
      <div>
        wallet data:
        {console.log(this.props.wallet.wallet._id)}
        {this.props.wallet.wallet._id &&        
        !this.props.wallet.loading ? (
          <>
          {this.props.wallet.wallet.priceData?<WalletStats />:"loading"}
            
            <WalletBalance
              transData={this.props.wallet.wallet.transactions}
              token={this.props.wallet.wallet.token}
            />
            <WalletTransactions
              transData={this.props.wallet.wallet.transactions}
            />
          </>
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  //isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  getWallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// export default connect(mapStateToProps, { getWallet })(Wallet);
