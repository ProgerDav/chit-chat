import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Box,
  ListItemAvatar,
} from "@material-ui/core";
import moment from "moment";
import "./RoomDrawer.css";
import { Close, Delete } from "@material-ui/icons";
import CopyButton from "../CopyButton/CopyButton";
import { connect } from "react-redux";
import { toggleJoinByLink, updateRoomInfo } from "../../store/rooms/rooms.actions";
import { RoomInfo } from "./RoomInfo/RoomInfo";

const RoomParticipants = ({ currentRoom, currentUserId, onlineUserIds }) => (
  <List>
    {currentRoom.participants.map(({ uid, displayName, photoURL, lastLoginAt }) => (
      <ListItem key={uid}>
        <ListItemAvatar>
          <Avatar src={photoURL} />
        </ListItemAvatar>
        <ListItemText
          primary={displayName}
          secondary={onlineUserIds.includes(uid) ? "Online" : "Last seen " + moment(lastLoginAt).fromNow()}
        />
        <ListItemSecondaryAction>
          {uid !== currentUserId && (
            <IconButton>
              <Delete variant="danger" />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

function RoomDrawer({
  loading,
  currentUser,
  currentRoom,
  setDrawerOpen,
  drawerOpen,
  toggleJoinByLink,
  onlineUserIds,
  updateRoomInfo
}) {
  const handletoggleJoinByLink = () => {
    toggleJoinByLink(currentRoom._id, currentUser.uid);
  };

  return (
    <div className="drawer__container">
      <Drawer
        className="drawer"
        style={{ background: "transparent" }}
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        BackdropProps={{ invisible: true, style: { display: "none" } }}
      >
        <div className="drawer__header">
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
          <h3 className="drawer__headerTitle">Room info</h3>
        </div>
        <div className="drawer__body scroll">
          <RoomInfo updateRoomInfo={updateRoomInfo} loading={loading} currentRoom={currentRoom} />

          <div className="drawer__item room__participants">
            <List>
              <ListItem>
                <ListItemText primary="People can join using invitation link! Click the button to copy the link." />
                <ListItemSecondaryAction>
                  <CopyButton
                    text={`http://localhost:3000/login/${currentRoom._id}`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handletoggleJoinByLink}
                    disabled={loading}
                  >
                    {currentRoom.joinByLink ? "Disable" : "Enable"} "Join by
                    link" feature {loading && <CircularProgress size={25} />}
                  </Button>
                </Box>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${currentRoom.participants.length} participants`}
                />
              </ListItem>
            </List>
            <RoomParticipants
              currentRoom={currentRoom}
              currentUserId={currentUser.uid}
              onlineUserIds={onlineUserIds}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default connect(null, { toggleJoinByLink, updateRoomInfo })(RoomDrawer);
