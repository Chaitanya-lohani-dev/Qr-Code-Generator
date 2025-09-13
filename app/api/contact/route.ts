import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "../../../components/emails/ContactFormEmail";
import React from "react";
import { render } from "@react-email/render";

// Create Resend client using API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email where all contact form messages will be sent
const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "chaitanyalohani175@gmail.com";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Basic message length validation
    if (message.length < 5) {
      return NextResponse.json(
        { error: "Message should be at least 5 characters long." },
        { status: 400 }
      );
    }

    // Render email HTML
    const emailHtml = await render(
      React.createElement(ContactFormEmail, {
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      })
    );

    // Send email with Resend
    const { error } = await resend.emails.send({
      from: "QRify Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New Message from ${firstName} ${lastName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
