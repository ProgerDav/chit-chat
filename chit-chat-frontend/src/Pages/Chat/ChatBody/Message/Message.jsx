import moment from "moment";

function Message({ currentUser, message }) {
  return (
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
}

export default Message;
