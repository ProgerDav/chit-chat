import { createSelector } from "reselect";

export const roomsSelector = (state) => state.roomsdata.rooms;

export const roomsLoadingSelector = (state) => state.roomsdata.loading;

export const currentRoomIdSelector = (state) => state.roomsdata.currentRoom;

export const roomsWithLastMessageSelector = createSelector(
  roomsSelector,
  (rooms) =>
    rooms.map((r) => ({ ...r, lastMessage: r.messages[r.messages.length - 1] }))
);

export const currentRoomSelector = createSelector(
  roomsSelector,
  currentRoomIdSelector,
  (rooms, currentRoomId) => {
    return rooms.find((r) => r._id === currentRoomId);
  }
);

export const currentRoomMessagesSelector = createSelector(
  [currentRoomSelector],
  (currentRoom) => currentRoom?.messages
);
