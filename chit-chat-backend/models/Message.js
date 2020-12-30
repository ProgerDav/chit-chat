import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: String,
    name: String,
    timestamp: { type: String, default: "" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    userId: String,
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

messageSchema.virtual("user", {
  ref: "user", // The model to use
  localField: "userId", // Find people where `localField`
  foreignField: "uid", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true,
});

export default mongoose.model("message", messageSchema);
