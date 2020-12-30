export const initialState = { user: {} };

export const actions = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.payload.user };
    case actions.LOGOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};
