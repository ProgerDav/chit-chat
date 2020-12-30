import { Router } from "express";
import {
  getMessagesForRoom,
  createMessage,
} from "../controllers/messagesController.js";
import { auth } from "../middleware/auth.milddleware.js";

const router = Router();

router.get("/messages/sync/:room", getMessagesForRoom);

router.post("/messages/new", auth, createMessage);

export default router;
