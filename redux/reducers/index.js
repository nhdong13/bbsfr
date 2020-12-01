import { combineReducers } from "redux"
import { currentUser } from "./auth"
import { currentDepartments } from "./departments";
// COMBINED REDUCERS
const reducers = {
  currentUser: currentUser,
  currentDepartments: currentDepartments,
};

export default combineReducers(reducers)
