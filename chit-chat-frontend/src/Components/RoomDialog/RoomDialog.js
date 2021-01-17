import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createRoom } from "../../store/rooms/rooms.actions";
import { useState } from "react";
import { connect } from "react-redux";

function RoomDialog({ open, setDialogOpen, currentUser, createRoom }) {
  const handleClose = () => {
    setDialogOpen(false);
    setName("");
  };

  const [name, setName] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!name.length) return;

    createRoom(name, currentUser.uid);
    setName("");
    handleClose();
  };

  return (
    <form action="/" onSubmit={handleCreateRoom}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After the room is created You will automatically be added as a
            participant.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Room name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateRoom}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default connect(null, { createRoom })(RoomDialog);
