import { Router } from "express";
import { auth } from "../middleware/auth.milddleware.js";
import {
  getAllRooms,
  createRoom,
  getRoomById,
  removeParticipant,
  toggleJoinByLink,
  updateRoom,
} from "../controllers/roomsController.js";
import { multer } from "../services/multerService.js";

const router = Router();

router.get("/rooms/sync/:uid", auth, getAllRooms);

router.post("/rooms/new", auth, createRoom);

router.get("/rooms/:id", getRoomById);

router.patch(
  "/rooms/:id/update",
  auth,
  multer.fields(["name", { name: "image", maxCount: 1 }]),
  updateRoom
);

router.patch("/rooms/:id/toggle-joinByLink", auth, toggleJoinByLink);

router.delete("/rooms/:id/remove-participant", auth, removeParticipant);

export default router;
