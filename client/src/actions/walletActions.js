import { GET_WALLET, SET_WALLET_PRICE_DATA, SET_WALLET_STATS, WALLET_LOADING } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5000/";

export const getWallet = (addres) => (dispatch) => {
  dispatch(setWalletLoading());
  console.log("getting wallet of adress: " + addres);
  
  axios
    .get(`/api/wallets/${addres}`)
    .then((res) => {

      dispatch({
        type: GET_WALLET,
        payload: res.data,
      });
    })
    .catch((err) =>{
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status))}
    );
};

export const setWalletLoading = () => {
  return {
    type: WALLET_LOADING,
  };
};

export const setWalletStats = (payload) => {
  //console.log("in set wallet stats actio");
  return {
    type: SET_WALLET_STATS,
    payload,
  };
};

export const setWalletPriceData = (payload) => {
  //console.log("in set wallet stats actio");
  return {
    type: SET_WALLET_PRICE_DATA,
    payload,
  };
};
