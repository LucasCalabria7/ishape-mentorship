'use client';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#1d1d1d]">
      <main className="flex-1">{children}</main>
    </div>
  )
}