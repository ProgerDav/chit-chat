import React, { useEffect, useState } from "react";
import { useAuthState } from "./State/auth/AuthStateProvider";
import { useRoomsState } from "./State/rooms/RoomsStateProvider";
import { actions } from "./State/auth/authReducer";
import { useRoutes } from "./hooks/routes.hook";
import { auth } from "./firebase";
import { useHttp } from "./hooks/http.hook";
import { SET_LAST_MESSAGE } from "./State/rooms/actions";
import { usePresenceChannel, useEvent, usePusher, } from "@harelpls/use-pusher";
import "./App.css";

function App() {
  const { request } = useHttp();
  const [{ user }, dispatch] = useAuthState();
  const [{ currentRoom }, roomsDispatch] = useRoomsState();
  const [messages, setMessages] = useState([]);
  const { client } = usePusher();
  useEffect(() => {
    client?.connection.bind("connected", () => {
      dispatch({
        type: actions.SET_SOCKET_ID,
        payload: { socketId: client.connection.socket_id },
      });
    });
  }, [client, dispatch, actions]);

  const { channel: messagesChannel } = usePresenceChannel("presence-messages");
  useEvent(messagesChannel, "inserted", (message) => {
    alert(message.message);
    if (currentRoom._id === message.room) setMessages([...messages, message]);
    else
      roomsDispatch({
        type: SET_LAST_MESSAGE,
        payload: { roomId: message.room, message },
      });
  });

  useEffect(() => {
    (async function () {
      try {
        if (!user.uid || !currentRoom._id) return;

        const response = await request({
          url: "/messages/sync/" + currentRoom._id,
        });
        setMessages(response.data);
      } catch (e) {}
    })();
  }, [setMessages, request, currentRoom, user]);

  useEffect(() => {
    auth.onAuthStateChanged(async (firbaseUser) => {
      if (!firbaseUser) return;

      dispatch({
        type: actions.SET_USER,
        payload: { user: { ...firbaseUser } },
      });
    });
  }, [dispatch, request]);

  const routes = useRoutes(user.uid !== undefined, messages);

  return (
    <div className="app">
      <div className="app__body">{routes}</div>
    </div>
  );
}

export default App;
