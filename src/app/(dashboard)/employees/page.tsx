"use client"
import { useAuthStore } from '@/contexts/useStore'
import { redirect } from 'next/navigation'
import React from 'react'

const EmployeesPage = () => {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    return redirect("/auth/sign-in")
  }

  return (
    <div>EmployeesPage</div>
  )
}

export default EmployeesPage