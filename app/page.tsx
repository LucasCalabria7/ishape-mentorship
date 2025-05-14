import PublicLayout from "@/components/layouts/public-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <PublicLayout>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Build your next SaaS platform with our modern stack
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            High-performance SaaS platform with Next.js 13, React, and Tailwind CSS.
            Everything you need to get started.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}