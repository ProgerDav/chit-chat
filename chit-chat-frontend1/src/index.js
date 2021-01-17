import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PusherProvider } from "@harelpls/use-pusher";
import { configs } from "./pusher";
import { AuthProvider } from "./State/auth/AuthStateProvider";
import {
  reducer,
  initialState as authInitialState,
} from "./State/auth/authReducer";

import { RoomsProvider } from "./State/rooms/RoomsStateProvider";
import {
  initialState as roomsInitialState,
  roomsReducer,
} from "./State/rooms/roomsReducer";

ReactDOM.render(
  <React.StrictMode>
    <PusherProvider {...configs}>
      <AuthProvider initialState={authInitialState} reducer={reducer}>
        <RoomsProvider initialState={roomsInitialState} reducer={roomsReducer}>
          <App />
        </RoomsProvider>
      </AuthProvider>
    </PusherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
