"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Salad, Bot, User } from "lucide-react"

const navItems = [
  {
    title: "Treinos",
    href: "/dashboard",
    icon: Dumbbell,
    emoji: "🏋️"
  },
  {
    title: "Dieta",
    href: "/diet",
    icon: Salad,
    emoji: "🥗"
  },
  {
    title: "Íris",
    href: "/iris",
    icon: Bot,
    emoji: "🤖"
  },
  {
    title: "Eu",
    href: "/me",
    icon: User,
    emoji: "👤"
  }
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#272727] py-2 px-4">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-item ${
                isActive ? "text-[#e86e23]" : "text-[#b3b3b3]"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}