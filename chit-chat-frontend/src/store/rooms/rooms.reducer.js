import {
  SET_CURRENT_ROOM,
  SET_LOADING,
  SET_ROOMS,
  ADD_ROOM,
  ADD_MESSAGE,
  UPDATE_ROOM,
} from "./rooms.types";

const initialState = {
  rooms: [],
  currentRoom: null,
  loading: false,
  error: null,
};

// const defaultRoom = {
//   _id: "",
//   name: "title",
//   messages: [],
//   participants: [],
// };

function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS:
      return { ...state, rooms: action.payload, loading: false };
    case ADD_ROOM:
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms, action.payload],
      };
    case UPDATE_ROOM:
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms.map(r => r._id === action.payload.roomId ? {...r, ...action.payload.roomData} : r)],
      }  
    case ADD_MESSAGE:
      const message = action.payload;
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms.map(r => r._id === message.room ? {...r, messages: [...r.messages, message]} : r)],
      };
    case SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

export default roomsReducer;
