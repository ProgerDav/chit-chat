import { Router } from "express";
import { auth } from "../middleware/auth.milddleware.js";
import Room from "../models/Room.js";
import {
  getAllRooms,
  getRoomById,
  removeParticipant,
  toggleJoinByLink,
} from "../controllers/roomsController.js";

const router = Router();

router.get("/rooms/sync/:uid", auth, getAllRooms);

router.post("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { roomQuery = {} } = req.body;
    console.log(roomQuery);
    const room = await Room.findOne({ _id: id, ...roomQuery });

    res.json({ room });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/rooms/new", async (req, res) => {
  try {
    const { name, authenticatedUser } = req.body;
    const room = await Room.create({
      name,
      participants,
      createdAt: new Date().toUTCString(),
    });

    res.json({ room });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/rooms/:id/toggle-joinByLink", auth, toggleJoinByLink);

router.delete("/rooms/:id/remove-participant", auth, removeParticipant);

export default router;
