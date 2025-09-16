import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_ADMIN_PASS,
  },
});

// Verify connection configuration once on startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.error(" SMTP connection error:", error);
//   } else {
//     console.log("SMTP server is ready to send emails");
//   }
// });

/**
 * Send a welcome email to new users after registration.
 * @param {string} toEmail - Recipient's email address
 * @param {string} userName - Recipient's full name
 */


// make draft to send mail in given format

// wellcome draft when user get logged in

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const pdfPath = './public/temp/LumioFlow.pdf';

    const mailOptions = {
      from: `"Support@lumio.flow" <${process.env.EMAIL_ADMIN}>`,
      to: toEmail,
      subject: "Thanks for Joining LumioFlow – Let’s Get Started!",
      html:`
       <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2E86C1;">Hello ${userName},</h2>
        <p>Welcome to <strong>LumioFlow</strong> — your intelligent electricity consumption dashboard. We're excited to have you with us!</p>

        <p>With LumioFlow, you can:</p>
        <ul style="line-height: 1.6;">
          <li><strong>📊 Real-Time Monitoring:</strong> Track your energy consumption by room or device instantly.</li>
          <li><strong>🚨 Smart Alerts:</strong> Get notified immediately when usage exceeds your custom limits.</li>
          <li><strong>🔧 Custom Infrastructure Setup:</strong> Tailor your workspace settings for home, office, apartment, or school environments.</li>
          <li><strong>👥 Role-Based Access Control:</strong> Easily assign Admin and User roles for secure and efficient management.</li>
         <li><strong>📈 Detailed Analytics & Reports:</strong> Access clear, actionable insights to optimize your electricity usage and reduce costs.</li>
        </ul>

        <p>To help you get started smoothly, please find attached our <strong>LumioFlow User Guide</strong>. It covers everything you need to know to make the most of your new dashboard.</p>

        <p>If you have any questions or need assistance, feel free to reply to this email — we're here to help.</p>

        <p>Thank you for choosing LumioFlow. Together, let's create a smarter, energy-efficient future. 🚀</p>

        <p>Best regards,<br/>
        <strong>Team LumioFlow</strong></p>
       </div>
`
      ,
        attachments:[{          
          filename:"LumioFlow.pdf",
          path: pdfPath,
          contentType: 'application/pdf',         
        }
      ],
        
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.accepted && info.accepted.length > 0) {
      console.log(`Email successfully sent to: ${info.accepted.join(", ")}`);
    } else {
      console.warn(`Email not accepted by SMTP server for: ${toEmail}`);
    }
  } catch (error) {
    console.error(`Failed to send welcome email to ${toEmail}:`, error);
    throw error; // so the caller can handle it
  }
};


// sedning reset password

export const sendResetOTP = async (toEmail, otp) => {
  try {
    const mailOptions = {
      from: `"LumioFlow Support" <${process.env.EMAIL_ADMIN}>`, 
      to: toEmail,
      subject: "Your LumioFlow OTP for Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2E86C1;">Your OTP: ${otp}</h2>
          <p>Hi there,</p>
          <p>You're receiving this email because you requested to reset your password on <strong>LumioFlow</strong>.</p>
          <p>Please use the above OTP to verify your identity. This OTP is valid for <strong>15 minutes</strong>.</p>
          <hr />
          <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email or contact support immediately.</p>
          <p style="font-size: 12px; color: #888;">LumioFlow Team</p>
        </div>
      `,
      text: `Your OTP: ${otp}\nUse this to reset your LumioFlow password. It is valid for 15 minutes.\nIf you didn't request this, ignore this email.`,
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'LumioFlow Mailer'
      }
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.accepted?.length > 0) {
      console.log(`Email successfully sent to: ${info.accepted.join(", ")}`);
    } else {
      console.warn(`Email not accepted by SMTP server for: ${toEmail}`);
    }
  } catch (error) {
    console.error(` Failed to send OTP to ${toEmail}:`, error.message);
    throw error;
  }
};
