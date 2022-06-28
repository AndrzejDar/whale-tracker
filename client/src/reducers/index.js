import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import walletReducer from './walletReducer';
import listReducer from './listReducer';
;


export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    wallet: walletReducer,
    list: listReducer
});
