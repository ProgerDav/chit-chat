import { Avatar, TextField, Button, CircularProgress } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { firebaseStorage } from "../../../services/firebase";

export const RoomInfo = ({ currentRoom, updateRoomInfo, loading }) => {
  const [name, setName] = useState(currentRoom.name);
  const [image, setImage] = useState(null);
  const [roomImageUrl, setRoomImageUrl] = useState(null);
  const isModified = currentRoom.name !== name || image;

  const getRoomImageUrl = useCallback(async () => {
    const url = await firebaseStorage
      .child(currentRoom?.imageURL.split("/").pop())
      .getDownloadURL();

    setRoomImageUrl(url);
  }, [setRoomImageUrl, currentRoom?.imageURL]);

  useEffect(() => {
    getRoomImageUrl();
  }, [getRoomImageUrl]);
  const handleSubmit = () => updateRoomInfo(currentRoom._id, name, image);

  return (
    <div className="drawer__item room__info">
      <div className="room__avatar">
        <Avatar
          variant="rounded"
          style={{ width: "100%", height: "auto" }}
          src={roomImageUrl}
        />
      </div>
      <div>
        <TextField
          fullWidth
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          type="file"
          fullWidth
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <h5 className="room__createdAt">
          Room was created at: {currentRoom.createdAt}
        </h5>
        {isModified && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save {loading && <CircularProgress size={25} />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomInfo;
