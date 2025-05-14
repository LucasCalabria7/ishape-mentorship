"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push("/login")
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/login")
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(true)
        }
      }
    )

    checkAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  return <>{children}</>
}