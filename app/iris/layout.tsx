import ProtectedRoute from "@/components/protected-route"
import DashboardLayout from "@/components/layouts/dashboard-layout"

export default function IrisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}