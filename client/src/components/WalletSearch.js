import { connect } from "react-redux";
import React, { useState } from "react";
import { getWallet } from "../actions/walletActions";

function WalletSearch({wallet,getWallet}) {
  const [searchInput, changeSearchInput] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    //dispatch action searching wallet
    //console.log("searching " + wallet.loading);
    //console.log(searchInput);
    
    getWallet(searchInput);
  };

  return (
    <div>
      <label>Find wallet:</label>
      <input
        type="search"
        placeholder="enter wallet addres"
        value={searchInput}
        onChange={(e) => {
          changeSearchInput(e.target.value);
        }}
      />
      <button onClick={(e) => clickHandler(e)}>Search</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  getWallet: (addres)=>dispatch(getWallet(addres)),
});

export default connect(mapStateToProps,mapDispatchToProps)(WalletSearch);
