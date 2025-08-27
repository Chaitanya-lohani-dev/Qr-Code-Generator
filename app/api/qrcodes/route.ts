// app/api/qrcodes/route.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]/route"; // Import authOptions

// Apne saare QR codes get karne ke liye
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const qrCodes = await prisma.qRCode.findMany({
            where: { user: { email: session.user.email } },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(qrCodes);
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Naya QR code banane ke liye
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { url, name } = await request.json();

        if (!url || !name) {
            return NextResponse.json({ error: "URL and name are required" }, { status: 400 });
        }

        const newQRCode = await prisma.qRCode.create({
            data: {
                url,
                name,
                user: { connect: { email: session.user.email } },
            },
        });

        return NextResponse.json(newQRCode);
    } catch (error) {
        console.error("Error creating QR code:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
