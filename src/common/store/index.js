import { combineReducers } from "redux";
import { Home, Detail, List } from "../modules";

const rootReducer = combineReducers({ Home, Detail, List });
export default rootReducer;
