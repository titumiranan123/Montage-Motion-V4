import nodemailer from "nodemailer";
import { IContact } from "./contact.interface";
import config from "../../config";
export async function sendEmailToAdmin(contact: IContact) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.app_gmail,
      pass: config.app_password,
    },
  });

  const mailOptions = {
    from: `"From Portfolio" <${contact.email}>`,
    to: `${config.app_gmail}`,
    replyTo: contact.email,
    subject: " New Contact Form Submission",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">📬 New Contact Message Received</h2>
        <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${contact.name}</p>
        <p style="font-size: 16px; color: #555;"><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #3498db; text-decoration: none;">${contact.email}</a></p>
        <p style="font-size: 16px; color: #555;"><strong>Message:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px; color: #333;">${contact.message}</p>
      </div>
      <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">This message was sent from the contact form on Your Website.</p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
}
