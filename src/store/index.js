import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./users/reducer";
import ProductReducer from "./products/reducer";
import OrdersReducer from "./order/reducer";
import CartReducer from "./cart/reducer";
/**
 * Base import for the app
 */
export default legacy_createStore(
  combineReducers({
    user: UserReducer,
    products: ProductReducer,
    orders: OrdersReducer,
    cart: CartReducer,
  }),
  applyMiddleware(thunk)
);
