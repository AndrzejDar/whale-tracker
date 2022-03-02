import {GET_WALLET, WALLET_LOADING} from './types';
import { returnErrors } from "./errorActions";
import axios from 'axios';


axios.defaults.baseURL="http://localhost:5000/"


export const getWallet=(addres)=>(dispatch)=>{
    dispatch(setWalletLoading());
    console.log("getting wallet of adress: " + addres);    
    axios
    .get(`/api/wallets/${addres}`)
    .then((res) =>{
      //console.log(res);
      dispatch({
        type: GET_WALLET,
        payload: res.data,
      })}
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

export const setWalletLoading = () => {
    return {
      type: WALLET_LOADING,
    };
  };