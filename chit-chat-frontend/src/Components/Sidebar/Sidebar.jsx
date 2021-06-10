import {
  Avatar,
  IconButton,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import {
  DonutLarge,
  Chat,
  ExitToApp,
  SearchOutlined,
  Add
} from "@material-ui/icons";

import "./Sidebar.css";

const SidebarChats = ({ loading, rooms, setCurrentRoom }) => {
  if (loading)
    return (
      <center>
        <CircularProgress />
      </center>
    );

  return rooms.map((room, i) => (
    <div
      className="sidebarChat"
      onClick={() => setCurrentRoom(room._id)}
      key={i}
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{room.name}</h2>
        {room.lastMessage && (
          <p>
            {room.lastMessage.name}: {room.lastMessage.message}
          </p>
        )}
      </div>
    </div>
  ));
};

function Sidebar({ setDialogOpen, rooms, setCurrentRoom, logout, currentUser, loading }) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={currentUser?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton onClick={logout}>
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
          <h2>My rooms.</h2>
          <Fab onClick={() => setDialogOpen(true)} color="primary" size="medium" aria-label="add">
            <Add />
          </Fab>
        </div>
        <SidebarChats
          loading={loading}
          rooms={rooms}
          setCurrentRoom={setCurrentRoom}
        />
      </div>
    </div>
  );
}

export default Sidebar;
