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
  TextField,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useHttp } from "../../hooks/http.hook";

import "./RoomDrawer.css";
import { Close } from "@material-ui/icons";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { UPDATE_ROOM } from "../../State/rooms/actions";
import RoomParticipants from "../RoomParticipants/RoomParticipants";
import CopyButton from "../CopyButton/CopyButton";

function RoomDrawer({ currentRoom, toggleDrawer, open }) {
  const [, dispatch] = useRoomsState();
  const { loading, request } = useHttp();

  const toggleJoinByLink = async () => {
    try {
      const response = await request({
        url: `/rooms/${currentRoom._id}/toggle-joinByLink`,
        method: "PATCH",
      });
      const room = response.data.room;
      if (response.data.success)
        dispatch({ type: UPDATE_ROOM, payload: { room, roomId: room._id } });
    } catch (e) {}
  };

  return (
    <div className="drawer__container">
      <Drawer
        className="drawer"
        style={{ background: "transparent" }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
        BackdropProps={{ invisible: true, style: { display: "none" } }}
      >
        <div className="drawer__header">
          <IconButton onClick={() => toggleDrawer(false)}>
            <Close />
          </IconButton>
          <h3 className="drawer__headerTitle">Room info</h3>
        </div>
        <div className="drawer__body scroll">
          <div className="drawer__item room__info">
            <div className="room__avatar">
              <Avatar src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F56435345_821815801544401_3515612400302686208_n.jpg%3Foh%3D2bcb079e10bde5aade58b4eb77b7ea9c%26oe%3D5FA87295&t=s&u=37494397756%40c.us&i=1544528225&n=X9VPbQDnKvHQ6J434qVMzhZCivEzix3Xjexv%2BOORVmI%3D" />
            </div>
            <div>
              <TextField fullWidth defaultValue={currentRoom.name} />
            </div>
            <div>
              <TextField type="file" fullWidth />
              <h5 className="room__createdAt">
                Room was created at: {currentRoom.createdAt}
              </h5>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="drawer__item room__participants">
            <List>
              <ListItem>
                <ListItemText primary="People can join using invitation link! Click the button to copy the link." />
                <ListItemSecondaryAction>
                  <CopyButton
                    text={`http://localhost:3000/${currentRoom._id}`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleJoinByLink}
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
            <RoomParticipants currentRoom={currentRoom} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default RoomDrawer;
