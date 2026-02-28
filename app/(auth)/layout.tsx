import { QrCodeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
            <QrCodeIcon className="h-8 w-auto text-cyan-600" />
            <span className="text-slate-900 font-bold text-2xl">QRify</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
