import { useEvent, usePresenceChannel } from "@harelpls/use-pusher";
import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RoomDrawer from "../../Components/RoomDrawer/RoomDrawer";
import RoomInvitation from "../../Components/RoomInvitation/RoomInvitation";
import { currentUserSelector } from "../../store/auth/auth.selectors";
import { addMessage, sendMessage } from "../../store/rooms/rooms.actions";
import {
  currentRoomMessagesSelector,
  currentRoomIdSelector,
  currentRoomSelector,
  roomsLoadingSelector,
} from "../../store/rooms/rooms.selector";
import Chat from "./Chat";

export const ChatContainer = ({
  currentRoom,
  messages,
  currentUser,
  loading,
  sendMessage,
  location,
  addMessage,
}) => {
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emojiModalOpen, setEmojiModalOpen] = useState(false);

  const handleEmojiClick = (e, emoji) => {
    setMessage(message + " " + emoji.emoji);
  };

  const invitationToken = location?.state?.invitationToken;

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message, currentRoom._id, currentUser.uid);
    setMessage("");
  };

  const { channel: messagesChannel } = usePresenceChannel("presence-messages");
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const updateOnlineUserIdsState = () =>
    setOnlineUserIds(Object.keys(messagesChannel?.members?.members || {}));

  useEvent(messagesChannel, "pusher:subscription_succeeded", () =>
    updateOnlineUserIdsState()
  );

  useEvent(messagesChannel, "pusher:member_added", () =>
    updateOnlineUserIdsState()
  );

  useEvent(messagesChannel, "pusher:member_removed", () =>
    updateOnlineUserIdsState()
  );

  useEvent(messagesChannel, "inserted", ({ message }) => {
    message.userId !== currentUser.uid && addMessage(message);
  });

  return (
    <>
      <RoomInvitation
        invitationToken={invitationToken}
        currentUser={currentUser}
      />
      {currentRoom && (
        <RoomDrawer
          onlineUserIds={onlineUserIds}
          loading={loading}
          currentUser={currentUser}
          currentRoom={currentRoom}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      )}
      <Chat
        emojiModalOpen={emojiModalOpen}
        setEmojiModalOpen={setEmojiModalOpen}
        handleEmojiClick={handleEmojiClick}
        setDrawerOpen={setDrawerOpen}
        currentUser={currentUser}
        currentRoom={currentRoom}
        messages={messages}
        loading={loading}
        message={message}
        setMessage={setMessage}
        sendMessage={handleSendMessage}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: roomsLoadingSelector(state),
  currentRoomId: currentRoomIdSelector(state),
  currentRoom: currentRoomSelector(state),
  messages: currentRoomMessagesSelector(state),
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = { sendMessage, addMessage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatContainer));
