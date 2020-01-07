import { combineReducers } from 'redux';

import userReducer from './users/user.reducer'
import cartReducer from './cart/cart.reducers'

export default combineReducers({
    user: userReducer,
    cart: cartReducer
});