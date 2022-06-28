import { GET_WALLET_TOP_LIST, TOP_LIST_LOADING } from "../actions/types";

const initState = {
  topList: [],
  loading: true,
};
export default function (state = initState, action) {
  console.log(action.type);
  switch (action.type) {
    case GET_WALLET_TOP_LIST:
      return {
        topList: action.payload,
        loading: false,
      };
    case TOP_LIST_LOADING:
      return {
        topList: [],
        loading: true,
      };
    default:
      return state;
  }
}
