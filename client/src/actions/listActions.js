import axios from 'axios';
import { returnErrors } from "./errorActions";
import { GET_WALLET_TOP_LIST, TOP_LIST_LOADING } from './types';


axios.defaults.baseURL = "http://localhost:5000/";

export const getList=(location)=>(dispatch)=>{
    dispatch(setListLoading());

    axios
    .get(`/api${location}`)
    .then((res) => {
      dispatch(setList(res.data))
    })
    .catch((err) => {       
      dispatch(returnErrors(err.response.data, err.response.status))
    });
}

export const setListLoading=()=>({
    type: TOP_LIST_LOADING,    
});


export const setList=(payload)=>({
    type: GET_WALLET_TOP_LIST,    
    payload,
});

