import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { otp } = await request.json();

    if (!otp) {
      return new NextResponse("OTP is required", { status: 400 });
    }

    // Find the verification record
    const verification = await prisma.studentVerification.findUnique({
      where: { userId }
    });

    if (!verification) {
      return new NextResponse("No verification request found. Please request OTP first.", { status: 404 });
    }

    // Check if already verified
    if (verification.status === 'verified') {
      return NextResponse.json({
        success: true,
        message: "Student status already verified!",
        status: "verified"
      });
    }

    // Check if OTP is expired
    if (verification.otpExpiry && new Date() > verification.otpExpiry) {
      await prisma.studentVerification.update({
        where: { userId },
        data: { status: 'expired' }
      });
      
      return new NextResponse("OTP has expired. Please request a new one.", { status: 400 });
    }

    // Verify OTP
    if (verification.otp !== otp) {
      return new NextResponse("Invalid OTP. Please try again.", { status: 400 });
    }

    // Update verification status
    await prisma.studentVerification.update({
      where: { userId },
      data: {
        status: 'verified',
        verifiedAt: new Date(),
        otp: null, // Clear OTP for security
        otpExpiry: null
      }
    });

    // Update user's subscription to student_pro if they don't have a paid plan
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    if (!existingSubscription || existingSubscription.plan === 'free') {
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          plan: 'student_pro',
          status: 'active',
          updatedAt: new Date()
        },
        create: {
          userId,
          plan: 'student_pro',
          status: 'active'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Student status verified successfully! You now have access to Student Pro features.",
      status: "verified"
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
