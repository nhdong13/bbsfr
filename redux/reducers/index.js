import { combineReducers } from "redux"
import { notify } from "./notify"
import { currentDepartments } from "./departments"
// COMBINED REDUCERS
const reducers = {
  notify: notify,
  currentDepartments: currentDepartments,
}

export default combineReducers(reducers)
