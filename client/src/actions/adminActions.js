import {
  GET_ADDRESSES,
  ADDRESSES_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getAddresses = ()=>(dispatch) => {
  console.log("gathering addresses");
  dispatch(setAddressesLoading());

  axios
    .get("/api/admin/addresses")
    .then((res) => {
        
      dispatch({
        type: GET_ADDRESSES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

const setAddressesLoading = () => {
  return {
    type: ADDRESSES_LOADING,
  };
};


