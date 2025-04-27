import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { sendWhatsAppMessage } from "@/lib/sendWhatsAppMessage";
import { sendContactEmail } from "@/lib/sendContactEmail";
import { checkRateLimit } from "@/utils/checkRateLimit";
import { RATE_LIMIT } from "@/config/rateLimitConfig";
import { extractClientIp } from "@/utils/getClientIp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: true, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: true, message: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return NextResponse.json(
        { error: true, message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        {
          error: true,
          message: "Message must be between 10 and 2000 characters.",
        },
        { status: 400 }
      );
    }

    const ip = extractClientIp(req);

    const rateLimit = await checkRateLimit(ip, RATE_LIMIT.CONTACT_FORM);
    if (!rateLimit.ok) {
      return new NextResponse(rateLimit.body, {
        status: rateLimit.status,
        headers: rateLimit.headers,
      });
    }

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message, ip }]);

    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
      return NextResponse.json(
        { error: true, message: "Failed to save message to database." },
        { status: 500 }
      );
    }

    await sendWhatsAppMessage(
      process.env.TWILIO_WHATSAPP_TO!,
      `New contact message from ${name}:\nEmail: ${email}\nMessage: ${message}`
    );

    await sendContactEmail({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error." },
      { status: 500 }
    );
  }
}
