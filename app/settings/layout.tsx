import ProtectedRoute from "@/components/protected-route"
import DashboardLayout from "@/components/layouts/dashboard-layout"

export default function SettingsLayout({
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