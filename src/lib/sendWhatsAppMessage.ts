// src/lib/sendWhatsAppMessage.ts
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_FROM!; // например 'whatsapp:+14155238886'

const client = new Twilio(accountSid, authToken);

export async function sendWhatsAppMessage(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body,
      from: fromWhatsAppNumber,
      to: to,
    });

    console.log("WhatsApp message sent:", message.sid);
    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}
