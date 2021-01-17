export const isAuthenticated = state => state.auth.currentUser ? true : false;

export const currentUserSelector = state => state.auth.currentUser;

export const invitedRoomSelector = state => state.auth.invitedRoom;

export const authLoadingSelector = state => state.auth.loading;

export const authErrorSelector = state => state.auth.error;
