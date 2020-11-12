const UPDATE_EMAIL = "UPDATE_EMAIL"

export const updateEmail = (email) => (dispatch) =>
  dispatch({
    type: UPDATE_EMAIL,
    payload: { email },
  })

const initialGlobalState = {
  email: "",
}

export const exampleReducer = (
  state = initialGlobalState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_EMAIL:
      return { email: payload.email }
    default:
      return state
  }
}
