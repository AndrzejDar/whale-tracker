import { GET_ADDRESSES, ADDRESSES_LOADING} from "../actions/types";

const initialState = {
  addresses: [],
  loading: false
};
//POJEBAŁEM ZMIENNE!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESSES:
      console.log(action.payload);
      return {        
        //addresses: [...state.addresses,action.pyload],
        addresses: [...action.payload],
        loading: false
      };

    case ADDRESSES_LOADING:
      return {
        addresses: [],
        loading:true
      };

    default:
      return state;
  }
}
