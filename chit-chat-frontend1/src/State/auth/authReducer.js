export const initialState = { user: {}, socketId: null };

export const actions = {
  SET_USER: "SET_USER",
  SET_SOCKET_ID: "SET_SOCKET_ID",
  LOGOUT: "LOGOUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.payload.user };
    case actions.SET_SOCKET_ID:
      console.log(action.payload.socketId, "REDUCER SET_SOCKET_ID");
      return { ...state, socketId: action.payload.socketId };
    case actions.LOGOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};
