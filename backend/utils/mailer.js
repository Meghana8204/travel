import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({quiet: true});

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER ,
    pass: process.env.EMAIL_PASS ,
  }
});
// Send booking confirmation email
export const sendBookingConfirmationEmail = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmed - Travel Agency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Booking Confirmed!</h2>
        <p>Dear Customer,</p>
        <p>Your booking has been successfully confirmed. Here are the details:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
          <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
          <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
          <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
        </div>
        <p>Thank you for choosing our travel agency. We look forward to serving you!</p>
        <p>Best regards,<br>Travel Agency Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send booking pending email
export const sendBookingPendingEmail = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Received - Travel Agency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF9800;">Booking Received</h2>
        <p>Dear Customer,</p>
        <p>We have received your booking request. It is currently under review. Here are the details:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
          <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
          <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
          <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
        </div>
        <p>We will notify you once your booking is confirmed. If you have any questions, please contact us.</p>
        <p>Best regards,<br>Travel Agency Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send booking cancelled email
export const sendBookingCancelledEmail = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Cancelled - Travel Agency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f44336;">Booking Cancelled</h2>
        <p>Dear Customer,</p>
        <p>Your booking has been cancelled. Here are the details:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
          <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
          <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
          <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
        </div>
        <p>If you have any questions or need assistance, please contact us.</p>
        <p>Best regards,<br>Travel Agency Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send payment success email
export const sendPaymentSuccessEmail = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Payment Successful - Booking Pending Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Payment Successful!</h2>
        <p>Dear Customer,</p>
        <p>Your payment has been successfully processed. Your booking is now pending confirmation by our admin team. Here are the details:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Package:</strong> ${bookingDetails.packageName}</p>
          <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
          <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
          <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
          <p><strong>Payment Status:</strong> Paid</p>
          <p><strong>Booking Status:</strong> Pending Confirmation</p>
        </div>
        <p>You will receive a confirmation email once your booking is reviewed and approved by our team. We appreciate your patience.</p>
        <p>Best regards,<br>Travel Agency Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
