const SET_NOTIFY = "SET_NOTIFY"
const RESET_NOTIFY = "RESET_NOTIFY"

export const setNotify = (data) => (dispatch) =>
  dispatch({
    type: SET_NOTIFY,
    payload: { data },
  })

export const resetNotify = () => (dispatch) => dispatch({ type: RESET_NOTIFY })

const initialState = {
  type: "",
  message: "",
}

export const notify = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOTIFY:
      return payload.data
    case RESET_NOTIFY:
      return initialState
    default:
      return state
  }
}
