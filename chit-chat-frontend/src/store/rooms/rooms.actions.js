import axios from "../../services/axios";
import {
  SET_CURRENT_ROOM,
  SET_LOADING,
  SET_ROOMS,
  ADD_ROOM,
  UPDATE_ROOM,
  ADD_MESSAGE,
} from "./rooms.types";

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const setCurrentRoom = (roomId) => ({
  type: SET_CURRENT_ROOM,
  payload: roomId,
});

export const setRooms = (payload) => ({
  type: SET_ROOMS,
  payload,
});

export const addRoom = (payload) => ({
  type: ADD_ROOM,
  payload,
});

export const updateRoom = (roomId, roomData) => ({
  type: UPDATE_ROOM,
  payload: { roomId, roomData },
});

export const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload,
});

export const fetchRooms = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/rooms/sync/${userId}`, {
      headers: { Authorization: `Bearer ${userId}` },
    });

    dispatch(setRooms(response.data.rooms));
  } catch (e) {
    throw e;
  }
};

export const createRoom = (name, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      `/rooms/new`,
      { name },
      { headers: { Authorization: `Bearer ${userId}` } }
    );

    dispatch(addRoom(response.data.room));
  } catch (e) {
    throw e;
  }
};

export const sendMessage = (message, room, userId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      `/messages/new`,
      { message, room, socketId: getState().auth.socketId },
      { headers: { Authorization: `Bearer ${userId}` } }
    );

    dispatch(addMessage(response.data));
  } catch (e) {
    throw e;
  }
};

export const toggleJoinByLink = (roomId, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.patch(
      `/rooms/${roomId}/toggle-joinByLink`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    if (response.data.success)
      dispatch(
        updateRoom(response.data.room._id, {
          joinByLink: response.data.room.joinByLink,
        })
      );
  } catch (e) {
    throw e;
  }
};

export const acceptRoomInvitation = (roomId, userId, callback) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.put(
      `/users/accept-invitation`,
      { invitedRoomId: roomId, socketId: getState().auth.socketId },
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    if (!response.data.success && callback) {
      dispatch(setLoading(false));
      return callback(response.data.message, response.data.success);
    }

    dispatch(addRoom(response.data.room));
    callback(response.data.message, response.data.success);
  } catch (e) {
    throw e;
  }
};

export const updateRoomInfo = (roomId, name, image) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const response = await axios.patch(`/rooms/${roomId}/update`, formData, {
      headers: {
        Authorization: `Bearer ${getState().auth.currentUser.uid}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // dispatch(setLoading(false));
    dispatch(updateRoom(roomId, response.data));
  } catch (e) {
    throw e;
  }
};
