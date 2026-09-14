import { Resend } from "resend";

const FROM_EMAIL = "Axon Digital Website <website@axondigital.xyz>";
const TO_EMAIL = "contact@axondigital.xyz";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    payload = body as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = textValue(payload.name);
  const email = textValue(payload.email);
  const phone = textValue(payload.phone);
  const message = textValue(payload.message);

  const validEmail =
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    !/[\r\n]/.test(email);

  if (
    name.length < 2 ||
    name.length > 120 ||
    /[\r\n]/.test(name) ||
    !validEmail ||
    phone.length > 50 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json(
      { error: "Email service is unavailable." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New website inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (!error) {
      return Response.json({ ok: true });
    }

    console.error("Resend contact form error:", error);
  } catch (error) {
    console.error("Resend contact form request failed:", error);
  }

  return Response.json(
    { error: "Email delivery failed." },
    { status: 502 },
  );
}
