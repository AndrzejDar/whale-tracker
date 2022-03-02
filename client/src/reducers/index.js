import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import walletReducer from './walletReducer';
;


export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    wallet: walletReducer
});
