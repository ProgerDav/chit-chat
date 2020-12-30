import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import bodyParser from "body-parser";

import MessagesRouter from "./routes/messagesRouter.js";
import RoomsRouter from "./routes/roomsRouter.js";
import UsersRouter from "./routes/usersRouter.js";

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

const pusher = new Pusher({
  appId: "1098009",
  key: "3da211a4d0f31ef61f87",
  secret: "bf82f9dde61b6afa2212",
  cluster: "ap2",
  useTLS: true,
});

const connectionUrl =
  "mongodb+srv://chit_chat_user:qvOyXmBASFuxQKWi@cluster0.zyyou.mongodb.net/chitchatdb?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDb connected");

  const messagesCollection = db.collection("messages");
  const messagesChangeStream = messagesCollection.watch();

  messagesChangeStream.on("change", (change) => {
    // console.log(change);

    if (change.operationType !== "insert") return;

    const { message, name, timestamp, room, userId } = change.fullDocument;
    // console.log(`messages`);
    pusher.trigger(`presence-messages`, "inserted", {
      message,
      name,
      timestamp,
      room,
      userId,
    });
  });
});

app.use(APP_BASE_URL, MessagesRouter);
app.use(APP_BASE_URL, RoomsRouter);
app.use(APP_BASE_URL, UsersRouter);

app.get("/", (req, res) => {
  res.send(app._router.stack.filter((r) => r.route).map((r) => r.route.path));
});

app.post("/pusher/auth", (req, res) => {
  // console.log(req.body);
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: {
      name: "Mr Channels",
      twitter_id: "@pusher",
    },
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

app.listen(PORT, () => console.log(`Listenting on localhost:${PORT}`));
