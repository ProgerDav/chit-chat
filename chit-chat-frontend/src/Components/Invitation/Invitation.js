import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";

import "./Invitation.css";
import { useRoomsState } from "../../State/rooms/RoomsStateProvider";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ADD_ROOM, SET_CURRENT_ROOM } from "../../State/rooms/actions";

function Invitation({ history }) {
  const [{ rooms }, dispatch] = useRoomsState();
  const [responseText, setResponseText] = useState(null);
  const [room, setRoom] = useState({ name: "" });
  const { roomId } = useParams();
  const { request, loading, error } = useHttp();

  const joinRoom = async () => {
    try {
      const response = await request({
        url: "/users/accept-invitation",
        method: "PUT",
        data: { invitedRoom: room },
      });
      setResponseText(response.data.message);
      if (response.data.success)
        dispatch({ type: ADD_ROOM, payload: { room } });
    } catch (e) {}
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await request({
          url: `/rooms/${roomId}`,
          method: "POST",
          data: { roomQuery: { joinByLink: true } },
        });

        if (response.data.room == null) setResponseText("Room not found");

        if (rooms.find((r) => r._id === response.data.room)) {
          dispatch({
            type: SET_CURRENT_ROOM,
            payload: { currentRoom: response.data.room },
          });
          history.push("/");
        }

        setRoom(response.data.room);
      } catch (e) {}
    })();
  }, [roomId, request, rooms, dispatch, history]);

  if (loading)
    return (
      <div className="invitation__container">
        <CircularProgress />
      </div>
    );

  if (error || responseText)
    return (
      <div className="chat">
        <div className="invitation__container">
          <div>
            <h2>{error || responseText}</h2>
            <Link to="/">
              <Button onClick={joinRoom} variant="contained" color="primary">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="chat">
      <div className="invitation__container">
        <div>
          <h2>Hey! You are invited to room called '{room?.name}'</h2>
          <Button onClick={joinRoom} variant="contained" color="primary">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Invitation);
