import { combineReducers } from "redux";
import AuthReducers from "./authreducer";
import Streamlist from "./streamreducer";
import SearchReducer from "./searchreducer";

export default combineReducers({
  auth: AuthReducers,
  streams: Streamlist,
  search: SearchReducer,
});
