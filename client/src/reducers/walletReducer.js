import { GET_WALLET, ADD_WALLET, DELETE_WALLET, WALLET_LOADING } from "../actions/types";

const initialState = {
  wallet: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return {
        ...state,
        wallet: action.payload,
        loading: false
      };
    case DELETE_WALLET:
      return {
        ...state,
        wallet: state.wallet.filter(wallet=>wallet._id!==action.payload)
      };
    case ADD_WALLET:
      return {
        ...state,
        wallet: [action.payload, ...state.wallet]
      };
    case WALLET_LOADING:
      return {
        ...state,
        loading:true
      };
    default:
      return state;
  }
}
