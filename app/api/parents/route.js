import dbConnect from "@/lib/db/mongodb";
import Parents from "@/models/Parents";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const users = await Parents.find({});
  return NextResponse.json(users);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const newUser = await Parents.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
