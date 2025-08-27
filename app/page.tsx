// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Jab bhi koi is page par aaye, usse '/dashboard' par bhej do
    router.push('/dashboard');
  }, [router]);

  // Page par kuch dikhane ki zarurat nahi, kyunki redirect ho jayega
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
