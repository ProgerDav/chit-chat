import React from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { useHttp } from "../../hooks/http.hook";
import { UPDATE_ROOM } from "../../State/rooms/actions";

function RoomParticipants({ currentRoom }) {
  const [, dispatch] = useRoomsState();
  const { loading, request, error } = useHttp();

  const removeParticipant = async (uid, name) => {
    try {
      if (
        !window.confirm(
          `Are you sure you want to remove ${name} from this group`
        )
      )
        return;

      const response = await request({
        url: `/rooms/${currentRoom._id}/remove-participant`,
        method: "DELETE",
        data: { participantUid: uid },
      });

      if (response.data.success)
        dispatch({
          type: UPDATE_ROOM,
          payload: {
            roomId: currentRoom._id,
            room: {
              participants: currentRoom.participants.filter(
                (p) => p.uid !== uid
              ),
            },
          },
        });
    } catch (e) {}
  };

  if (loading)
    return (
      <center>
        <CircularProgress />
      </center>
    );

  if (error) return <h3>{error}</h3>;

  return (
    <List>
      {currentRoom.participants.map(({ uid, displayName, photoUrl }) => (
        <ListItem key={uid}>
          <ListItemAvatar>
            <Avatar src={photoUrl} />
          </ListItemAvatar>
          <ListItemText primary={displayName} secondary="Last seen at..." />
          <ListItemSecondaryAction>
            <IconButton onClick={() => removeParticipant(uid, displayName)}>
              <Delete variant="danger" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default RoomParticipants;
