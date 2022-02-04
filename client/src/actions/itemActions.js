import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
axios.defaults.baseURL = "http://localhost:5000/"; //CORS WORKAROUND, hardcoding port COMENT FOR PRODUCTION SERVER!!!!!!
// axios.defaults.withCredentials = false;
// axios.defaults.crossDomain = true;

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  console.log('in addItem Action' + item.name);
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios.delete(`/api/items/${id}`, tokenConfig(getState))
  .then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  )
  .catch((err) =>
  dispatch(returnErrors(err.response.data, err.response.status))
);
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
