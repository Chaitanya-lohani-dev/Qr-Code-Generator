// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider"; // Naya component import karein

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code Tracker",
  description: "Generate and track your QR codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* Yahan poori app ko wrap karein */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
