import { connect } from "react-redux";
import React from "react";
import { getAddresses } from "../actions/adminActions";
import axios from "axios";


function Admin({ addresses, getAddresses }) {
  const scrapeHandler = (e) => {
    e.preventDefault();
    console.log(e);
    getAddresses();
  };

  const loadHandler = async (e) => {
    e.preventDefault();

           
    addresses.addresses.forEach((addres,index) => {
       // console.log(addres);
       setTimeout(()=>{
        //console.log('ping');
      axios.get(`/api/wallets/${addres}`)
    },200*index)
    });
  };

  return (
    <div>
      <button id="1" onClick={(e) => scrapeHandler(e)}>
        scrape addresses list
      </button>
      <button id="2asd" onClick={(e) => loadHandler(e)}>
        load wallets from list
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  addresses: state.admin.addresses,
});

const mapDispatchToProps = (dispatch) => ({
  getAddresses: () => dispatch(getAddresses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
