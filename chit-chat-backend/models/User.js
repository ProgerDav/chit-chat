import mongoose from "mongoose";

const preferencesSchema = mongoose.Schema({
  _id: false,
  theme: String,
  stayLoggedIn: mongoose.Schema.Types.Boolean,
  showWhenOnline: mongoose.Schema.Types.Boolean,
  showLastLoginDate: mongoose.Schema.Types.Boolean,
});

export const userSchema = mongoose.Schema({
  uid: String,
  displayName: String,
  photoURL: String,
  lastLoginAt: mongoose.Schema.Types.Date,
  preferences: {
    type: preferencesSchema,
    default: {
      theme: "light",
      stayLoggedIn: true,
      showWhenOnline: true,
      showLastLoginDate: true,
    },
  },
});

export default mongoose.model("user", userSchema);
