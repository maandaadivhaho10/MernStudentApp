import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/**
 * Send an email using Nodemailer
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text message
 * @param html Optional HTML content for styled emails
 */
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  try {
    // Verify transporter connection (only on first send or startup)
    await transporter.verify();
    console.log("✅ Email transporter is ready.");

    const mailOptions = {
      from: `"MernStudentApp" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || undefined,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email delivery failed");
  }
};
