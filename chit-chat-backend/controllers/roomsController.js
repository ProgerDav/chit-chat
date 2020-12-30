import Room from "../models/Room.js";

export const getAllRooms = async (req, res) => {
  try {
    const uid = req.body.authenticatedUser.uid;
    const rooms = await Room.find({ participantIds: uid })
      .populate(["participants", "lastMessage"])
      .populate("lastMessage.user");

    res.json({ rooms });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    res.json({ room });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const createRoom = async (req, res) => {
  try {
    const { name, authenticatedUser } = req.body;
    const room = await Room.create({
      name,
      participantIds: [authenticatedUser.uid],
      createdAt: new Date().toUTCString(),
    });

    res.json({ room });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const toggleJoinByLink = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) return res.status(404).json({ message: "Room was not found" });

    room.joinByLink = !room.joinByLink;
    room.save();

    res.json({ success: true, room });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { participantUid } = req.body;
    const room = await Room.findById(id).populate("participants");

    if (!room) return res.status(404).json({ message: "Room was not found" });

    await room.update({ $pull: { participantIds: participantUid } });

    return res.json({ success: true });
  } catch (e) {
    res.status(500).send(e);
  }
};
