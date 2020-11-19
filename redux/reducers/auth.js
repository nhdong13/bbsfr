const SET_CURRENT_USER = "SET_CURRENT_USER"

export const setCurrentUser = (data) => (dispatch) =>
  dispatch({
    type: SET_CURRENT_USER,
    payload: { data },
  })

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
}

export const currentUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return payload.data
    default:
      return state
  }
}
