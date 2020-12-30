import mongoose from "mongoose";

const connectionUrl =
  "mongodb+srv://chit_chat_user:qvOyXmBASFuxQKWi@cluster0.zyyou.mongodb.net/chitchatdb?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import dbConnection from "./mongoose.js";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1098009",
  key: "3da211a4d0f31ef61f87",
  secret: "bf82f9dde61b6afa2212",
  cluster: "ap2",
  useTLS: true,
});

function watchChanges() {
  dbConnection.once("open", () => {
    console.log("MongoDb connected");

    const messagesCollection = db.collection("messages");
    const messagesChangeStream = messagesCollection.watch();
    const roomsCollection = db.collection("rooms");
    const roomsChangeStream = roomsCollection.watch();

    messagesChangeStream.on("change", (change) => {
      console.log(change);

      if (change.operationType !== "insert") return;

      const { message, name, timestamp, roomId } = change.fullDocument;
      pusher.trigger(`${roomId}-messages`, "inserted", {
        message,
        name,
        timestamp,
      });
    });

    roomsChangeStream.on("change", (change) => {
      if (change.operationType !== "insert") return;

      const { name, createdAt, participants } = change.fullDocument;
      participants.foreach((user) => {
        pusher.trigger(`${user.uid}-messages`, "inserted", {
          name,
          participants,
          createdAt,
        });
      });
    });
  });
}

export { watchChanges };
