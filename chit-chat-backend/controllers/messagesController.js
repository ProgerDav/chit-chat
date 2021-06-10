import Message from "../models/Message.js";
import { broadcastMessage } from "../services/pusherService.js";

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
    const { message, room, authenticatedUser, socketId } = req.body;

    console.log("AUTH-----", authenticatedUser);

    const dbMessage = await Message.create({
      message,
      room,
      userId: authenticatedUser.uid,
      name: authenticatedUser.displayName,
    });

    console.log('DBMessage', dbMessage);
    await broadcastMessage(dbMessage, socketId);

    res.status(201).json(dbMessage);
  } catch (e) {
    res.status(500).send(e);
  }
};
