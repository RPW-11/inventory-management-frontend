"use client"

import { useAuthStore } from "@/contexts/useStore"
import { redirect } from "next/navigation"

const AnalyticsPage = () => {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    return redirect("/auth/sign-in")
  }

  return (
    <div>AnalyticsPage</div>
  )
}

export default AnalyticsPage