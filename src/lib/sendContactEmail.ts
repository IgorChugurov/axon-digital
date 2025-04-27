import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  message,
}: SendContactEmailProps) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: "New message from the AxonDigital.eu website",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111;">New Contact Message</h2>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>

          <div style="padding: 12px 16px; background-color: #f9f9f9; border-radius: 8px; margin-top: 8px; white-space: pre-line;">
            ${escapeHtml(message)}
          </div>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

          <p style="font-size: 14px; color: #666; text-align: center;">
            This email was sent automatically from <strong>AxonDigital.eu</strong>.<br/>
            Please do not reply to this email.
          </p>
        </div>
      `.trim(),
    });

    if (error) {
      console.error("Error sending email via Resend:", error);
      throw new Error("Failed to send email");
    }
  } catch (err) {
    console.error("Error in sendContactEmail:", err);
    throw err;
  }
}

/**
 * Safely escape text for HTML content.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
