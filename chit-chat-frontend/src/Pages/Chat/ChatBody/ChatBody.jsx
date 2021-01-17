import { Fab } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { isScrolledToBottom, scrollToBottom } from "../../../services/scroll";

const Message = ({ message, currentUser }) => (
  <p
    className={`chat__message ${
      message.userId === currentUser.uid && "chat__sentByMe"
    }`}
  >
    <span className="chat__name">{message.name}</span>
    {message.message}
    <span className="chat__timestamp">
      {moment(message.timestamp).format("MMM Do YYYY")}
    </span>
  </p>
);

function ChatBody({ messages, currentUser, currentRoom }) {
  const chatBottomAnchor = useRef(null),
    [fixedBottom, setFixedBottom] = useState(true),
    handleScroll = (e) => {
      const fixed = isScrolledToBottom(e.target);
      if (fixed !== fixedBottom) setFixedBottom(fixed);
    };

  useEffect(() => {
    if (fixedBottom) scrollToBottom(chatBottomAnchor.current);
  }, [chatBottomAnchor, messages, fixedBottom]);

  useEffect(() => {
      setFixedBottom(true); //when room is changed, scroll down
  }, [currentRoom]);

  return (
    <div
      ref={chatBottomAnchor}
      onScroll={handleScroll}
      className="chat__body scroll"
    >
      {messages?.length === 0 && <h4>Be the first to send a message!</h4>}

      {messages &&
        messages.map((message, i) => (
          <Message key={i} message={message} currentUser={currentUser} />
        ))}

      {!fixedBottom && (
        <Fab
          style={{ position: "fixed", right: 20, bottom: 70 }}
          color="primary"
          size="small"
          onClick={() => scrollToBottom(chatBottomAnchor.current)}
        >
          <ArrowDownward />
        </Fab>
      )}
    </div>
  );
}

export default ChatBody;
