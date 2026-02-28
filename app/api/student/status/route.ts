import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get student verification status
    const verification = await prisma.studentVerification.findUnique({
      where: { userId },
      select: {
        id: true,
        email: true,
        status: true,
        verifiedAt: true,
        createdAt: true
      }
    });

    // Get subscription status
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        plan: true,
        status: true
      }
    });

    return NextResponse.json({
      verification: verification || null,
      subscription: subscription || { plan: 'free', status: 'active' },
      isStudentVerified: verification?.status === 'verified'
    });

  } catch (error) {
    console.error("Student status check error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
