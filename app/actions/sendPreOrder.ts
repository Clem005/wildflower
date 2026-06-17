"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPreOrder(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const product = formData.get("product") as string;

    if (!fullName || !email || !address || !product) {
      return { success: false, error: "Missing required fields" };
    }

    const customerHtmlContent = `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #4C5C44;">Thank you for your Pre-Order!</h2>
        <p>Hi ${fullName},</p>
        <p>We've successfully received your pre-order for <strong>${product}</strong>.</p>
        <p><em>Please note that this is a pre-buy. We will officially reach out to you with further details when the product officially launches!</em></p>
        <br />
        <h3>Your Details:</h3>
        <p><strong>Shipping Address:</strong><br />${address}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <br />
        <p>Warmly,<br />The Wildflower Team</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Wildflower Pre-Orders <onboarding@resend.dev>",
      to: [email],
      bcc: ["somaya@mywildflower.co.za", "viralklick@gmail.com"],
      subject: `Your Wildflower Pre-Order: ${product}`,
      html: customerHtmlContent,
    });

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unknown error occurred" };
  }
}
