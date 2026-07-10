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

    const adminHtmlContent = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; padding: 20px;">
        <h2>🚨 New Order Received!</h2>
        <p><strong>${fullName}</strong> has just placed a new order.</p>
        
        <h3>Order Details:</h3>
        <ul>
          <li><strong>Product:</strong> ${product}</li>
          <li><strong>Customer Name:</strong> ${fullName}</li>
          <li><strong>Customer Email:</strong> ${email}</li>
          <li><strong>Customer Phone:</strong> ${phone}</li>
        </ul>
        
        <h3>Shipping Address:</h3>
        <p>${address}</p>
        
        <br />
        <p><em>Please reach out to the customer at ${email} to communicate the next steps for their order.</em></p>
      </div>
    `;

    const [customerData, adminData] = await Promise.all([
      resend.emails.send({
        from: "Wildflower Orders <orders@mywildflower.co.za>",
        to: [email],
        subject: \`Your Wildflower Order: \${product}\`,
        html: customerHtmlContent,
      }),
      resend.emails.send({
        from: "Wildflower Orders <orders@mywildflower.co.za>",
        to: ["orders@mywildflower.co.za"],
        subject: \`NEW ORDER: \${product} - \${fullName}\`,
        html: adminHtmlContent,
      })
    ]);

    if (customerData.error) {
      return { success: false, error: customerData.error.message };
    }
    
    if (adminData.error) {
      return { success: false, error: adminData.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unknown error occurred" };
  }
}
