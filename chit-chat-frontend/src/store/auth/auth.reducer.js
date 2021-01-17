import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_USER,
  LOGOUT,
  SET_ERROR,
  SET_LOADING,
  SET_INVITED_ROOM,
  SET_SOCKET_ID
} from "./auth.types";

const intialState = {
  currentUser: null,
  invitedRoom: null,
  socketId: null,
  loading: false,
  error: null,
};

function authReducer(state = intialState, action) {
  switch (action.type) {
    case SET_SOCKET_ID:
      return { ...state, socketId: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload , loading: false};
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_INVITED_ROOM:
      return { ...state, invitedRoom: action.payload, loading: false };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case FETCH_USER:
    case LOGOUT:
      return { ...state, currentUser: action.currentUser, loading: false };
    default:
      return state;
  }
}

export default authReducer;
