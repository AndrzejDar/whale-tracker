import { GET_WALLET, ADD_WALLET, DELETE_WALLET, WALLET_LOADING, SET_WALLET_STATS, SET_WALLET_PRICE_DATA, GET_WALLET_TOP_LIST } from "../actions/types";

const initialState = {
  wallet: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      console.log(action.payload);
      return {        
        wallet: {...action.payload},////////ZMIENIONE DANE
        loading: false
      };
    case DELETE_WALLET:
      return {
        // ...state,
        // wallet: state.wallet.filter(wallet=>wallet._id!==action.payload)
      };
    case ADD_WALLET:
      return {
        // ...state,
        // wallet: [action.payload, ...state.wallet]
      };
    case WALLET_LOADING:
      return {
        wallet: {},
        loading:true
      };
    case SET_WALLET_STATS:
      return {
        wallet: {
          ...state.wallet,
        balance: action.payload.balance,
        capex: action.payload.capex,
        capin: action.payload.capin,
        },
        loading:false,        
      };
    case SET_WALLET_PRICE_DATA:
      return {
        wallet: {
          ...state.wallet,
        priceData: action.payload,
        },
        loading:false,        
      };
      case GET_WALLET:
        return {        
          wallet: {...action.payload[0]},////////ZMIENIONE DANE
          loading: false
        };




    default:
      return state;
  }
}
