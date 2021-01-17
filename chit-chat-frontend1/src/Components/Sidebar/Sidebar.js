import React, { useEffect } from "react";
import { Avatar, IconButton, CircularProgress } from "@material-ui/core";
import {
  Chat,
  DonutLarge,
  SearchOutlined,
  ExitToApp,
} from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { useAuthState } from "../../State/auth/AuthStateProvider";
import { useHttp } from "../../hooks/http.hook";
import "./Sidebar.css";
import { ADD_ROOM, SET_ROOMS } from "../../State/rooms/actions";
import { auth } from "../../firebase";
import { actions } from "../../State/auth/authReducer";
import pusher from "../../pusher";

function SidebarChats({ error, loading, sidebarChats }) {
  if (loading)
    return (
      <center>
        <CircularProgress />
      </center>
    );

  if (error) return <h4>{error}</h4>;

  return sidebarChats.map((room) => (
    <SidebarChat key={room._id} name={room.name} id={room._id} room={room} />
  ));
}

function Sidebar() {
  const [{ user }, ...other] = useAuthState(); // other[0] = dispatch
  const { loading, error, request } = useHttp();

  const [{ rooms }, dispatch] = useRoomsState();
  console.log(rooms);

  useEffect(() => {
    const roomsChannel = pusher.subscribe(`${user.uid}-rooms`);
    roomsChannel.bind("inserted", (room) => {
      dispatch({ type: ADD_ROOM, payload: { room } });
    });

    return () => {
      roomsChannel.unbind_all();
      roomsChannel.unsubscribe();
    };
  }, [user, dispatch]);

  useEffect(() => {
    (async function () {
      try {
        if (!user.uid) return;
        const response = await request({
          url: "/rooms/sync/" + user.uid,
        });
        dispatch({ type: SET_ROOMS, payload: { rooms: response.data.rooms } });
      } catch (e) {}
    })();
  }, [dispatch, request, user]);

  const signOut = () => {
    auth.signOut();
    other[0]({ type: actions.LOGOUT });
  };

  const addNewRoom = async () => {
    try {
      const name = window.prompt("Enter room name");
      if (!name) return;
      const response = await request({
        url: "/rooms/new",
        method: "POST",
        data: { name, participantIds: [user.uid] },
      });
      dispatch({ type: ADD_ROOM, payload: { room: response.data.room } });
    } catch (e) {}
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <div className="sidebar__buttonContainer">
          <h3 onClick={addNewRoom}>New room</h3>
        </div>
        <SidebarChats error={error} loading={loading} sidebarChats={rooms} />
      </div>
    </div>
  );
}

export default Sidebar;
