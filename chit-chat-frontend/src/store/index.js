import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import authReducer from "./auth/auth.reducer";
import roomsReducer from "./rooms/rooms.reducer";
import thunk from "redux-thunk";

export const store = createStore(combineReducers({auth: authReducer, roomsdata: roomsReducer}), composeWithDevTools(applyMiddleware(thunk)));

