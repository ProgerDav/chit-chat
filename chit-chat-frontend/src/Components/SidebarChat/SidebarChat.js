import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { SET_CURRENT_ROOM } from "../../State/rooms/actions";

function SidebarChat({ name, room }) {
  const [, dispatch] = useRoomsState();

  const setCurrentRoom = (e) => {
    // e.preventDefault();
    dispatch({ type: SET_CURRENT_ROOM, payload: { currentRoom: room } });
  };

  return (
    <Link to="/">
      {/* <a href="/" onClick={setCurrentRoom}> */}
      <div className="sidebarChat" onClick={setCurrentRoom}>
        <Avatar />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {room.lastMessage && (
            <p>
              {room.lastMessage.name}: {room.lastMessage.message}
            </p>
          )}
        </div>
      </div>
      {/* </a> */}
    </Link>
  );
}

export default SidebarChat;
