import { Router } from "express";
import { login, acceptRoomInvitation } from "../controllers/usersController.js";
import { auth } from "../middleware/auth.milddleware.js";

const router = Router();

router.put("/users/login", login);

router.put("/users/accept-invitation", auth, acceptRoomInvitation);

export default router;
