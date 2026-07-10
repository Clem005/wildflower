"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchase(formData: FormData) {
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
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #E4DCD3; padding: 40px; color: #2A3324; text-align: center;">
        <h1 style="font-size: 24px; font-weight: normal; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; border-bottom: 1px solid rgba(42, 51, 36, 0.2); padding-bottom: 20px;">Wildflower</h1>
        
        <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px;">Order Received</h2>
        
        <p style="font-size: 14px; line-height: 1.8; margin-bottom: 20px;">Dear ${fullName},</p>
        
        <p style="font-size: 14px; line-height: 1.8; margin-bottom: 30px;">
          Thank you for placing your order for the <strong>${product}</strong>. We are thrilled to welcome you to the Wildflower ritual.
        </p>

        <p style="font-size: 14px; line-height: 1.8; margin-bottom: 40px;">
          <em>We will get to your order shortly. Our team is currently preparing your botanicals, and we will communicate the next steps and tracking details to you very soon.</em>
        </p>
        
        <div style="text-align: left; background-color: rgba(255, 255, 255, 0.3); padding: 30px; margin-bottom: 40px;">
          <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; opacity: 0.7;">Shipping Details</h3>
          <p style="font-size: 14px; margin: 0; line-height: 1.6;">${address}</p>
          <p style="font-size: 14px; margin: 10px 0 0 0;">Phone: ${phone}</p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.8; opacity: 0.8;">
          Warmly,<br />
          The Wildflower Team
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Wildflower Orders <orders@mywildflower.co.za>",
      to: [email],
      bcc: ["somaya@mywildflower.co.za"],
      subject: `Your Wildflower Order: ${product}`,
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
