import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// 🚨 Fix for Next.js hot reload
delete mongoose.connection.models["User"];

export default mongoose.models.User || mongoose.model("User", UserSchema);
