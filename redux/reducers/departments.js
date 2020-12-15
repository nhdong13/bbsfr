const SET_DEPARTMENTS = "SET_DEPARTMENTS"
const initialState = []
import { useDispatch } from "react-redux"

export const setDepartments = (data) => {
  const dispatch = useDispatch()
  dispatch({
    type: SET_DEPARTMENTS,
    payload: { data },
  })
}

export const currentDepartments = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DEPARTMENTS:
      return payload.data
    default:
      return state
  }
}
