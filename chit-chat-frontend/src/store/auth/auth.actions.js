import axios from "../../services/axios";
import { auth, googleAuthProvider } from "../../services/firebase";
import {
  SET_LOADING,
  SET_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_USER,
  LOGOUT,
  SET_INVITED_ROOM,
  BEARER_TOKEN_KEY, 
  SET_SOCKET_ID
} from "./auth.types";

export const setSocketId = (payload) => {
  return {
    type: SET_SOCKET_ID,
    payload,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const setInvitedRoom = (room) => {
  return {
    type: SET_INVITED_ROOM,
    payload: room,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    currentUser: auth.currentUser.toJSON(),
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
    currentUser: auth.currentUser.toJSON(),
  };
};

export const register = (email, password) => async (dispatch) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    dispatch(registerSuccess());
  } catch (error) {
    throw error;
  }
};

export const login = (invitedRoomId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await auth.signInWithPopup(googleAuthProvider);
    await axios.put('/users/login', { invitedRoomId, user: auth.currentUser });
    localStorage.setItem(BEARER_TOKEN_KEY, auth.currentUser.uid);
    dispatch(loginSuccess());
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();
    localStorage.removeItem(BEARER_TOKEN_KEY);
    dispatch({ type: LOGOUT, currentUser: auth.currentUser });
  } catch (error) {
    throw error;
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    await auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        localStorage.setItem(BEARER_TOKEN_KEY, currentUser.uid);
        dispatch({
          type: FETCH_USER,
          currentUser: currentUser.toJSON(),
        });
      } else {
        localStorage.removeItem(BEARER_TOKEN_KEY);
        dispatch({
          type: FETCH_USER,
          currentUser: null,
        });
      }
    });
  } catch (error) {
    throw error;
  }
};

export const fetchInvitedRoom = (invitationToken) => async (dispatch)  => {
  try{
    dispatch(setLoading(true));

    const response = await axios.get(`/rooms/${invitationToken}`);
    // if(response.status === 404) throw new Error(response.data.message);

    if(response.data.room) dispatch(setInvitedRoom(response.data.room));
  }catch(error){
    dispatch(setError(error.message));
  }
};
