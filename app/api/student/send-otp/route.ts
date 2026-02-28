import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation for .edu domains
function isValidStudentEmail(email: string): boolean {
  const studentDomains = [
    '.edu',
    '.ac.in',
    '.edu.in',
    '.university',
    '.college'
  ];
  
  return studentDomains.some(domain => email.toLowerCase().endsWith(domain));
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Validate student email
    if (!isValidStudentEmail(email)) {
      return new NextResponse("Please use a valid student email (.edu, .ac.in, etc.)", { status: 400 });
    }

    // Check if user already has a verification
    const existingVerification = await prisma.studentVerification.findUnique({
      where: { userId }
    });

    // If already verified, return success
    if (existingVerification?.status === 'verified') {
      return NextResponse.json({ 
        success: true, 
        message: "Student status already verified!",
        status: "verified"
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create or update verification record
    await prisma.studentVerification.upsert({
      where: { userId },
      update: {
        email,
        otp,
        otpExpiry,
        status: 'pending',
        updatedAt: new Date()
      },
      create: {
        userId,
        email,
        otp,
        otpExpiry,
        status: 'pending'
      }
    });

    // Send OTP email
    const { error } = await resend.emails.send({
      from: "QRify Student Verification <onboarding@resend.dev>",
      to: [email],
      subject: "Your QRify Student Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #06b6d4; margin: 0;">QRify</h1>
            <h2 style="color: #1f2937; margin: 10px 0;">Student Verification</h2>
          </div>
          
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #0c4a6e; margin: 0 0 15px 0;">Your Verification Code</h3>
            <div style="background: #ffffff; border: 2px solid #06b6d4; border-radius: 6px; padding: 15px; text-align: center; margin: 15px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #06b6d4; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="color: #374151; margin: 0; font-size: 14px;">
              This code will expire in 10 minutes. Please enter it in the verification form to confirm your student status.
            </p>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <h4 style="color: #92400e; margin: 0 0 10px 0;">🎓 Student Benefits</h4>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li>Get Student Pro plan FREE forever</li>
              <li>Unlimited QR codes and customization</li>
              <li>Priority support</li>
              <li>Advanced analytics (coming soon)</li>
            </ul>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            <p style="margin: 0;">This email was sent for student verification. If you didn't request this, please ignore.</p>
            <p style="margin: 5px 0 0 0;">QRify - Built by a student, for the community</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Email sending error:", error);
      return new NextResponse("Failed to send OTP email", { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your student email. Please check your inbox and enter the code within 10 minutes."
    });

  } catch (error) {
    console.error("Student verification error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
