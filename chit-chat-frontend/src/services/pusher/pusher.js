// import Pusher from "pusher-js";
import { BEARER_TOKEN_KEY } from "../../store/auth/auth.types";

// export default new Pusher("3da211a4d0f31ef61f87", {
//   cluster: "ap2",
//   authEndpoint: "http://localhost:8080/pusher/auth",
// });

export const configs = {
  clientKey: "3da211a4d0f31ef61f87",
  cluster: "ap2",

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  // triggerEndpoint: "/pusher/trigger",

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  authEndpoint: "http://localhost:8080/pusher/auth",
  auth: {
    headers: { Authorization: `Bearer ${localStorage.getItem(BEARER_TOKEN_KEY)}` },
  },
};
