import User from "../models/User.js";
import Room from "../models/Room.js";
import mongoose from "mongoose";
import { broadcastNewParticipant } from "../services/pusherService.js";

export const login = async (req, res) => {
  try {
    const { user, invitedRoomId } = req.body;
    const token = user.stsTokenManager.accessToken;
    let dbUser = await User.findOne({ uid: user.uid });

    if (!dbUser) dbUser = await User.create({ ...user, token });

    if (mongoose.isValidObjectId(invitedRoomId)) {
      const room = await Room.findById(invitedRoomId);
      if (room && !room.participantIds.find(({ uid }) => uid === dbUser.uid)) {
        room.set("participantIds", [...room.participantIds, dbUser.uid]);
        room.save();
      }
    }

    res.json({ user: dbUser });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const acceptRoomInvitation = async (req, res) => {
  try {
    const { authenticatedUser, invitedRoomId, socketId } = req.body;

    if (!mongoose.isValidObjectId(invitedRoomId))
      res.status(404).json({ message: "Room was not found..." });
    const room = await Room.findOne({
      _id: invitedRoomId,
      joinByLink: true,
    });

    if (!room) res.status(404).json({ message: "Room was not found..." });

    if (room.participantIds.find((uid) => uid === authenticatedUser.uid))
      res.json({ success: false, message: "You are aleady in this room." });

    await room.set("participantIds", [...room.participantIds, authenticatedUser.uid]);
    await room.save();

    const roomWithMessages = await Room.findOne({ _id: room._id })
      .populate(["participants", "lastMessage", "messages"])
      .populate("lastMessage.user");

    await broadcastNewParticipant(roomWithMessages._id, roomWithMessages.participants, socketId);

    res.json({
      message: "You have joined the room successfully!",
      success: true,
      room: roomWithMessages,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(500).send(e);
  }
};
