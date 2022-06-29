import { GET_WALLET_TOP_LIST, TOP_LIST_LOADING } from "../actions/types";

const initState = {
  topList: {},
  loading: true,
};
export default function (state = initState, action) {
  console.log(action);
  switch (action.type) {
    case GET_WALLET_TOP_LIST:
      state.topList[action.listType] = action.payload;
      state.loading = false;

      return {
        ...state
      };
    case TOP_LIST_LOADING:
      return {
        topList: {...state.topList},
        loading: true,
      };
    default:
      return state;
  }
}
