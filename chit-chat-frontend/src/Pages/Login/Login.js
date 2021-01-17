import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login, fetchInvitedRoom } from "../../store/auth/auth.actions";
import { useParams } from "react-router-dom";
import Logo from "./logo.png";
import "./Login.css";
import {
  authErrorSelector,
  authLoadingSelector,
  invitedRoomSelector,
} from "../../store/auth/auth.selectors";

function Login({ login, loading, error, invitedRoom, fetchInvitedRoom }) {
  const { invitationToken } = useParams();
  useEffect(() => {
    if (invitationToken) {
      fetchInvitedRoom(invitationToken);
    }
  }, [invitationToken, fetchInvitedRoom]);

  const handleLogin = () => {
    login(invitedRoom?._id);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="Logo" />
        <div className="login__text">
          <h1>Sign in to ChitChat</h1>
          {invitedRoom && (
            <h2>
              Hey! You have been invited to room '{invitedRoom.name}'. Sign in to
              join
            </h2>
          )}
          {error && <h3>{error}</h3>}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    loading: authLoadingSelector(state),
    invitedRoom: invitedRoomSelector(state),
    error: authErrorSelector(state),
  }),
  { login, fetchInvitedRoom }
)(Login);
