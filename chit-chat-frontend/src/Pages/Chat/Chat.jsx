import {
  Avatar,
  IconButton,
  LinearProgress,
  Dialog,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";

import Picker from "emoji-picker-react";

import "./Chat.css";
import ChatBody from "./ChatBody/ChatBody";

function Chat({
  emojiModalOpen,
  setEmojiModalOpen,
  handleEmojiClick,
  setDrawerOpen,
  currentRoom,
  loading,
  messages,
  message,
  setMessage,
  currentUser,
  sendMessage,
}) {
  return (
    <div className="chat">
      <div className="chat__header">
        {currentRoom && (
          <>
            <Avatar />
            <div className="chat__headerInto">
              <h3>{currentRoom?.name}</h3>
            </div>
            <div className="chat__headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MoreVert />
              </IconButton>
            </div>
          </>
        )}
      </div>
      {loading && <LinearProgress />}

      <ChatBody
        messages={messages}
        currentUser={currentUser}
        currentRoom={currentRoom}
      />

      <div className="chat__footer">
        <Dialog open={emojiModalOpen} onClose={() => setEmojiModalOpen(false)}>
          <Picker onEmojiClick={handleEmojiClick} />
          <DialogActions>
            <Button
              onClick={() => setEmojiModalOpen(false)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={() => setEmojiModalOpen(true)}>
          <InsertEmoticon />
        </IconButton>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
