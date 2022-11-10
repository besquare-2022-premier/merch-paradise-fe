import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./users/reducer";
/**
 * Base import for the app
 */
export default legacy_createStore(
  combineReducers({ user: UserReducer }),
  applyMiddleware(thunk)
);
