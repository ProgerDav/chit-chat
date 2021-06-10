import Pusher from "pusher";

const pusher = new Pusher({
  // appId: process.env.PUSHER_APP_ID,
  // key: process.env.PUSHER_APP_KEY,
  // secret: process.env.PUSHER_APP_SECRET,
  // cluster: process.env.PUSHER_APP_CLUSTER,
  // useTLS: process.env.PUSHER_APP_USETLS,

  appId: "1098009",
  key: "3da211a4d0f31ef61f87",
  secret: "bf82f9dde61b6afa2212",
  cluster: "ap2",
  useTLS: true,
});

export const authenticateChannel = (req, res) => {
  const { channel_name, socket_id: socketId, authenticatedUser } = req.body;
  const presenceData = {
    user_id: authenticatedUser.uid,
    user_info: {
      name: authenticatedUser.name,
    },
  };
  const auth = pusher.authenticate(socketId, channel_name, presenceData);

  res.send(auth);
};

export const broadcastMessage = async (message, socketId) => {
  try {
    await pusher.trigger(
      `presence-messages`,
      "inserted",
      {
        message,
      },
      socketId
    );
  } catch (e) {}
};

export const broadcastNewParticipant = async (
  roomId,
  participants,
  socketId
) => {
  try {
    await pusher.trigger(
      `presence-rooms`,
      "new-participant",
      {
        roomId,
        participants,
      },
      socketId
    );
  } catch (e) {}
};
