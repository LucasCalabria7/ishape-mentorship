"use client"

import { MobileNav } from "@/components/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1d1d1d]">
      <main className="pb-20">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}