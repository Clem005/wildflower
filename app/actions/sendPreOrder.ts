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

    const htmlContent = `
      <h2>New Pre-Order Received!</h2>
      <p><strong>Product:</strong> ${product}</p>
      <hr />
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Shipping Address:</strong><br />${address}</p>
    `;

    const data = await resend.emails.send({
      from: "Wildflower Pre-Orders <onboarding@resend.dev>",
      to: ["viralklick@gmail.com"],
      subject: `New Pre-Order: ${product} from ${fullName}`,
      html: htmlContent,
      replyTo: email,
    });

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unknown error occurred" };
  }
}
