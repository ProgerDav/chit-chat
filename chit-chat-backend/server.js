import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import MessagesRouter from "./routes/messagesRouter.js";
import RoomsRouter from "./routes/roomsRouter.js";
import UsersRouter from "./routes/usersRouter.js";
import { auth } from "./middleware/auth.milddleware.js";
import { authenticateChannel } from "./services/pusherService.js";

const app = express();
const APP_BASE_URL = "/api/v1/";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "*",
  })
);

const PORT = process.env.PORT || 8080;

const connectionUrl =
  "mongodb+srv://chit_chat_user:qvOyXmBASFuxQKWi@cluster0.zyyou.mongodb.net/chitchatdb?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(APP_BASE_URL, MessagesRouter);
app.use(APP_BASE_URL, RoomsRouter);
app.use(APP_BASE_URL, UsersRouter);

app.post("/pusher/auth", auth, authenticateChannel);

app.listen(PORT, () => console.log(`Listenting on localhost:${PORT}`));
