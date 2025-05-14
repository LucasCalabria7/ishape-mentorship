"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  const isPublicRoute = !pathname.startsWith("/dashboard")

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">SaaS Platform</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {isPublicRoute ? (
          <>
            <Link
              href="/features"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/features" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Pricing
            </Link>
            <div className="ml-auto flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </>
        ) : null}
      </nav>
    </div>
  )
}