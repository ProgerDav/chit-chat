import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton, LinearProgress } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useAuthState } from "../../State/auth/AuthStateProvider";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { useHttp } from "../../hooks/http.hook";
import RoomDrawer from "../RoomDrawer/RoomDrawer";
import "./Chat.css";

function Chat({ messages = [] }) {
  const { request, loading } = useHttp();
  const chatBottomAnchor = useRef(null);
  const [{ user }] = useAuthState();
  const [{ currentRoom }] = useRoomsState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    chatBottomAnchor.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages, chatBottomAnchor]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.length === 0) return;

    try {
      await request({
        method: "POST",
        url: "/messages/new",
        data: {
          message,
          userId: user.uid,
          name: user.displayName,
          room: currentRoom._id,
        },
      });

      setMessage("");
    } catch (e) {}
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (value = false) => setOpen(value);

  if (!currentRoom.name) return <div className="chat"></div>;

  return (
    <div className="chat">
      <RoomDrawer
        currentRoom={currentRoom}
        open={open}
        toggleDrawer={toggleDrawer}
      />

      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInto">
          <h3>{currentRoom.name}</h3>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton onClick={() => toggleDrawer(true)}>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {loading && <LinearProgress />}

      <div className="chat__body scroll">
        {messages.map((message, i) => (
          <p
            className={`chat__message ${
              message.userId === user.uid && "chat__sentByMe"
            }`}
            key={i}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}

        <div ref={chatBottomAnchor} className="chat__anchor"></div>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
