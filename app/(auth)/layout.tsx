export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
