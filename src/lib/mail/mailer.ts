import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingConfirmation = async (
  email: string, 
  patientName: string, 
  date: string, 
  treatmentName: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"Aurelia Clinic" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Luxury Clinic - Booking Confirmed ✨",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #d4af37; text-align: center;">AURELIA CLINIC</h2>
          <p>Dear ${patientName},</p>
          <p>Thank you for choosing us. Your exclusive treatment has been successfully confirmed.</p>
          <div style="background: #fafafa; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37;">
            <p><strong>Treatment:</strong> ${treatmentName}</p>
            <p><strong>Date & Time:</strong> ${date}</p>
          </div>
          <p style="margin-top: 30px;">We look forward to welcoming you.</p>
          <p>Best Regards,<br/>The Aurelia Team</p>
        </div>
      `,
    });
    console.log(`Email sent successfully to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Failed to send email via Nodemailer:", error);
  }
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  try {
   
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${email}`;
    
    const info = await transporter.sendMail({
      from: `"Aurelia Clinic" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Aurelia Clinic - Verify Your Account ✨",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px;">
          <h2 style="color: #d4af37; text-align: center;">AURELIA CLINIC</h2>
          <p>Dear ${name},</p>
          <p>Welcome to Aurelia Clinic. To complete your registration and secure your account, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="background-color: #d4af37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 12px;">Verify Email</a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="font-size: 12px; word-break: break-all; color: #666;">${confirmLink}</p>
          <p style="margin-top: 30px;">Best Regards,<br/>The Aurelia Team</p>
        </div>
      `,
    });
    console.log(`Verification email sent to ${email}. ID: ${info.messageId}`);
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
};