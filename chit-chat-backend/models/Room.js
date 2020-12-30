import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    name: String,
    createdAt: String,
    joinByLink: { type: mongoose.Schema.Types.Boolean, default: true },
    participantIds: [{ type: String, ref: "User" }],
  },
  { toJSON: { virtuals: true } }
);

roomSchema.virtual("participants", {
  ref: "user",
  localField: "participantIds",
  foreignField: "uid",
  justOne: false, // for many-to-1 relationships
});

roomSchema.virtual("lastMessage", {
  ref: "message", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "room", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true,
  options: { sort: { timestamp: -1 }, limit: 1 }, // Query options, see http://bit.ly/mongoose-query-options
});

export default mongoose.model("room", roomSchema);
