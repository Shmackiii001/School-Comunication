// models/Parents.js
import mongoose from "mongoose";

const ParentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    childName: { type: String, required: true },
  },
  { timestamps: true } // 👈 createdAt & updatedAt
);

// 🚨 Fix for Next.js hot reload (force model refresh)
delete mongoose.connection.models["Parents"];

export default mongoose.models.Parents || mongoose.model("Parents", ParentsSchema);
