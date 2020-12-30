import Message from "../models/Message.js";

export const getMessagesForRoom = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room }).populate("user");

    res.json(messages);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const createMessage = async (req, res) => {
  try {
    const { message, room, authenticatedUser } = req.body;

    const dbMessage = await Message.create({
      message,
      room,
      userId: authenticatedUser.uid,
      name: authenticatedUser.displayName,
    });

    res.status(201).json(dbMessage);
  } catch (e) {
    res.status(500).send(e);
  }
};
