import User from "../models/User.js";
import Room from "../models/Room.js";

export const login = async (req, res) => {
  try {
    const { user, invitedRoom } = req.body;
    const token = user.stsTokenManager.accessToken;
    let dbUser = await User.findOne({ uid: user.uid });

    if (!dbUser) dbUser = await User.create({ ...user, token });

    // if (dbUser.token !== token) {
    //   dbUser.update({ token });
    //   console.log("token updated");
    // }

    // if (invitedRoom) {
    //   const room = await Room.findById(invitedRoom._id);
    //   console.log(room);
    //   if (room && !room.participantIds.find(({ uid }) => uid === dbUser.uid)) {
    //     // room.set("participants", [...room.participants, dbUser]);
    //     // room.save();
    //     room.update({ $push: { participantIds: user.uid } });
    //   }
    //   console.log(room.participantIds.length);
    // }
    res.json({ user: dbUser });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const acceptRoomInvitation = async (req, res) => {
  try {
    const { authenticatedUser, invitedRoom } = req.body;

    if (invitedRoom) {
      const room = await Room.findOne({
        _id: invitedRoom._id,
        joinByLink: true,
      });

      if (!room) res.json({ message: "Room was not found..." });

      if (room.participantIds.find((uid) => uid === authenticatedUser.uid))
        res.json({ message: "You are aleady in this room." });

      room.set("participantIds", [
        ...room.participantIds,
        authenticatedUser.uid,
      ]);
      room.save();
      console.log(room.participantIds.length);
    }
    res.json({
      message: "You have joined the room successfully!",
      success: true,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(500).send(e);
  }
};
