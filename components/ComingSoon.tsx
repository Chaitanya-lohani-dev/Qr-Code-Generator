// components/ComingSoon.tsx
export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex h-[60vh] items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-600">We’re working hard to bring this page to you soon 🚀</p>
      </div>
    </div>
  )
}
