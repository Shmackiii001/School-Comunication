import dbConnect from "@/lib/db/mongodb";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return Response.json(users);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const newUser = await User.create(body);
    return Response.json(newUser, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
