"use client"
import ProductList from "./product-list"
import EmployeeContacts from "./employee-contacts"
import Statistics from "./statistics"
import { useAuthStore } from "@/contexts/useStore"
import { redirect } from "next/navigation"

  
const MainPage = () => {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    return redirect("/auth/sign-in")
  }
  
  return (
    <div className="bg-white grid grid-cols-6 h-full gap-4">
       <div className="col-span-4 flex flex-col gap-4">
        <div className="flex flex-col w-full gap-4">
          <div>
            <h2 className="text-lg font-semibold">Main dashboard</h2>
            <p className="text-xs">A quick way to monitor and analyze your company.</p>
          </div>
          <Statistics/>
        </div>
        <ProductList/>
       </div>
       <div className="col-span-2">
        <EmployeeContacts/>
       </div>
    </div>
  )
}

export default MainPage