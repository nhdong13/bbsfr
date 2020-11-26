const SET_DEPARTMENTS = "SET_DEPARTMENTS";

const initialState = [];
export const setDepartments = (data) => (dispatch) =>
  dispatch({
    type: SET_DEPARTMENTS,
    payload: { data },
  });

export const currentDepartments = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DEPARTMENTS:
      return payload.data;
    default:
      return state;
  }
};
