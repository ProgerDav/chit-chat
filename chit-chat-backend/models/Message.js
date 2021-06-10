import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: String,
    type: {
      type: String,
      enum: ["message", "attachment", "notification"],
      default: "message"
    },
    attachment: {
      type: String,
      default: ""
    },
    name: String,
    timestamp: { type: Date, default: Date.now },
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
