"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  const isPublicRoute = !pathname.startsWith("/dashboard")

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <Link href="/" className="flex items-center">
        <span className="font-bold text-xl text-primary">iShape</span>
      </Link>
      {isPublicRoute && (
        <div className="flex flex-col items-center gap-4 w-full px-4 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button variant="ghost" className="w-full sm:w-auto">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary-dark">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  )
}