import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { auth, googleAuthProvider } from "../../firebase";
import { useAuthState } from "../../State/auth/AuthStateProvider";
import { useHttp } from "../../hooks/http.hook";
import { actions } from "../../State/auth/authReducer";
import { useParams } from "react-router-dom";
import Logo from "./logo.png";
import "./Login.css";

function Login() {
  const [, dispatch] = useAuthState();
  const { request, loading } = useHttp();
  const { roomId } = useParams();
  const [invitedRoom, setInvitedRoom] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await request({
          url: `/rooms/${roomId}`,
          data: { roomQuery: { joinByLink: true } },
        });
        if (!response.data.room) return;
        setInvitedRoom(response.data.room);
      } catch (e) {}
    })();
  }, [roomId, setInvitedRoom, request]);

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const response = await request({
        method: "PUT",
        url: "/users/login",
        data: { user: result.user, invitedRoom },
      });

      dispatch({
        type: actions.SET_USER,
        payload: { user: response.data.user },
      });
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="Logo" />
        <div className="login__text">
          <h1>Sign in to ChitChat</h1>
          {invitedRoom && (
            <h2>
              Hey! You have been invited to '{invitedRoom.name}'. Sign in to
              participate
            </h2>
          )}
        </div>
        <Button onClick={signIn} disabled={loading}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
