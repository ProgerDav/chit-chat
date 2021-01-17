import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  acceptRoomInvitation,
  createRoom,
} from "../../store/rooms/rooms.actions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchInvitedRoom } from "../../store/auth/auth.actions";
import {
  authErrorSelector,
  authLoadingSelector,
  invitedRoomSelector,
} from "../../store/auth/auth.selectors";

function RoomInvitation({
  currentUser,
  invitationToken,
  fetchInvitedRoom,
  invitedRoom,
  loading,
  error,
  acceptRoomInvitation,
}) {
  const [roomInvitationOpen, setRoomInvitationOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setRoomInvitationOpen(false);
  };

  useEffect(() => {
    fetchInvitedRoom(invitationToken);
  }, [invitationToken, fetchInvitedRoom]);

  useEffect(() => {
    if (invitedRoom) setRoomInvitationOpen(true);
  }, [invitedRoom]);

  const handleJoin = () => {
    // handleClose();
    acceptRoomInvitation(
      invitedRoom._id,
      currentUser.uid,
      (message, success) => {
        setMessage(message);
        setSuccess(success);
      }
    );
  };

  return (
    <Dialog
      open={roomInvitationOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Accept invitation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message ? message : (
            <>Hey! You have been invited to room '{invitedRoom?.name}'</>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} type="button" color="primary">
          Close
        </Button>
        {!success && (
          <Button
            onClick={handleJoin}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={loading}
          >
            Join Room
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  (state) => ({
    loading: authLoadingSelector(state),
    error: authErrorSelector(state),
    invitedRoom: invitedRoomSelector(state),
  }),
  {
    fetchInvitedRoom,
    acceptRoomInvitation,
  }
)(RoomInvitation);
