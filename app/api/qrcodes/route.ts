import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// URL validation helper
function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const qrCodes = await prisma.qRCode.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(qrCodes);
  } catch (error: any) {
    console.error("[QRCodes_GET]", JSON.stringify(error));
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const { url, name } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!url || !name) {
      return new NextResponse("URL and name are required", { status: 400 });
    }

    if (!isValidHttpUrl(url)) {
      return new NextResponse("Invalid URL format", { status: 400 });
    }

    const newQRCode = await prisma.qRCode.create({
      data: {
        url,
        name,
        userId: userId,
      },
    });

    return NextResponse.json(newQRCode);
  } catch (error: any) {
    console.error("[QRCodes_POST]", JSON.stringify(error));
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    const { id } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("QR Code ID is required", { status: 400 });
    }

    // Ensure user owns the QR code before deleting
    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
    });

    if (!qrCode || qrCode.userId !== userId) {
      return new NextResponse("QR Code not found or unauthorized", {
        status: 404,
      });
    }

    await prisma.qRCode.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[QRCodes_DELETE]", JSON.stringify(error));
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
