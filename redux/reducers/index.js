import { combineReducers } from "redux"
import { currentUser } from "./auth"
// COMBINED REDUCERS
const reducers = {
  currentUser: currentUser,
}

export default combineReducers(reducers)
