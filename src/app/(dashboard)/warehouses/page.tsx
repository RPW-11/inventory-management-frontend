"use client"

import { useAuthStore } from "@/contexts/useStore"
import { redirect } from "next/navigation"

const WarehousesPage = () => {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    return redirect("/auth/sign-in")
  }
  
  return (
    <div>WarehousesPage</div>
  )
}

export default WarehousesPage