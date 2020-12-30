import User from "../models/User.js";

export const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).send("Unauthenticated");

  const uid = authorization.split(" ")[1] || "";

  const user = await User.findOne({ uid });
  if (!user) return res.status(401).send("Unauthenticated");

  req.body.authenticatedUser = user;

  next();
};
