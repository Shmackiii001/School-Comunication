import dbConnect from "@/lib/db/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}

// POST (Login)
export async function POST(req) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Successful login
    return NextResponse.json(
      { success: true, message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
