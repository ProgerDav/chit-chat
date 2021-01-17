import {
  ADD_ROOM,
  SET_ROOMS,
  SET_CURRENT_ROOM,
  SET_LAST_MESSAGE,
  UPDATE_ROOM,
} from "./actions";

export const initialState = {
  loadedFromDb: false,
  rooms: [],
  currentRoom: {
    _id: "",
    name: "",
    participants: [],
    lastMessage: null,
  },
};

export const roomsReducer = (state, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return { ...state, rooms: action.payload.rooms, loadedFromDb: true };
    case ADD_ROOM:
      return { ...state, rooms: [...state.rooms, action.payload.room] };
    case UPDATE_ROOM:
      const { roomId, room } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r._id === roomId ? { ...r, ...room } : r
        ),
        currentRoom:
          state.currentRoom._id === roomId
            ? { ...state.currentRoom, ...room }
            : state.currentRoom,
      };
    case SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload.currentRoom };
    case SET_LAST_MESSAGE:
      const otherRooms = state.rooms.filter(
        (r) => r._id !== action.payload.roomId
      );
      const room1 = state.rooms.find((r) => r._id === action.payload.roomId);
      room1.lastMessage = action.payload.message;
      const currentRoom =
        state.currentRoom._id === action.payload.roomId
          ? room1
          : state.currentRoom;
      if (!room1) return state;
      return { ...state, rooms: [...otherRooms, room1], currentRoom };
    default:
      return state;
  }
};
