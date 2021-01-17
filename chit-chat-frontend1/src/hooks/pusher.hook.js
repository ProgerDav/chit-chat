import { useEffect } from "react";
import Pusher from "../pusher";

export const usePusher = (channel, callback) => {
  useEffect(() => {
    try {
      const messagesChannel = Pusher.subscribe(channel);
      alert("pusher subscribed");
      callback(messagesChannel);

      return () => {
        messagesChannel.unbind_all();
        messagesChannel.unsubscribe();
      };
    } catch (e) {}
  }, [channel, callback]);
};
