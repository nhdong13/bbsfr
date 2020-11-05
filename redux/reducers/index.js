import { combineReducers } from "redux"
import { exampleReducer } from "./example"
// COMBINED REDUCERS
const reducers = {
  example: exampleReducer,
}

export default combineReducers(reducers)
