import twilio from "twilio";

export async function POST(req) {
  const { to, message } = await req.json();

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const msg = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",   // ✅ must include whatsapp:
      to: `whatsapp:${to}`,            // e.g. whatsapp:+2547xxxxxxx
    });

    return Response.json({ success: true, sid: msg.sid });
  } catch (err) {
    console.error("Twilio error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
