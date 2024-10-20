"use client"
import useAuth from '@/hooks/useAuth'
import React from 'react'

const EmployeesPage = () => {
  useAuth();

  return (
    <div>EmployeesPage</div>
  )
}

export default EmployeesPage