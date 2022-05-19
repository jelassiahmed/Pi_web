import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import cartReducer from './cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : []
//   const initialState = {
//     cart: { cartItems: cartItemsFromStorage },
//   }
 export default combineReducers({
     auth,
     token,
     users,
     cartReducer,
    //  initialState
 })