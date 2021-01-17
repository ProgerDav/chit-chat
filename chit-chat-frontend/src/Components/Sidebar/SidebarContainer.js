import { useEvent, usePresenceChannel } from "@harelpls/use-pusher";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/auth/auth.actions";
import { currentUserSelector } from "../../store/auth/auth.selectors";
import { setCurrentRoom, fetchRooms, updateRoom } from "../../store/rooms/rooms.actions";
import {
  roomsLoadingSelector,
  roomsWithLastMessageSelector,
} from "../../store/rooms/rooms.selector";
import RoomDialog from "../RoomDialog/RoomDialog";
import Sidebar from "./Sidebar";

function SidebarContainer({
  setCurrentRoom,
  fetchRooms,
  rooms,
  logout,
  currentUser,
  updateRoom
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchRooms(currentUser.uid);
  }, [fetchRooms, currentUser]);

  const { channel: roomsChannel } = usePresenceChannel("presence-rooms");
  useEvent(roomsChannel, "new-participant", (data) => {
    updateRoom(data.roomId, { participants: data.participants });
  });

  return (
    <>
      <RoomDialog
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        currentUser={currentUser}
      />
      <Sidebar
        setDialogOpen={setDialogOpen}
        setCurrentRoom={setCurrentRoom}
        rooms={rooms}
        logout={logout}
        currentUser={currentUser}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  rooms: roomsWithLastMessageSelector(state),
  loading: roomsLoadingSelector(state),
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = { setCurrentRoom, fetchRooms, logout, updateRoom };

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
