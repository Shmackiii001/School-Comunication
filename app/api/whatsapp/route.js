import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const { contacts, message } = await req.json();

    if (!contacts || contacts.length === 0 || !message) {
      return NextResponse.json(
        { success: false, error: "Contacts and message are required" },
        { status: 400 }
      );
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const results = [];
    for (const contact of contacts) {
      try {
        const msg = await client.messages.create({
          body: message,
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // ✅ use env variable
          to: `whatsapp:${contact.phone}`, // e.g. +2547XXXXXXX
        });
        results.push({ contact: contact.phone, sid: msg.sid, success: true });
      } catch (err) {
        results.push({
          contact: contact.phone,
          error: err.message,
          success: false,
        });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error("Twilio WhatsApp error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
