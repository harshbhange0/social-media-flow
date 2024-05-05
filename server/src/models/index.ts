import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, require: true, unique: true },
  photoUrl: { type: String },
  bio: { type: String },
  about: { type: String },
});
const User = mongoose.model("user", UserSchema);
export default User;
