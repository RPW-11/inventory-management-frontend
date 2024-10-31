"use client"
import { useAuthStore } from "@/contexts/useStore";
import { useFetchApi } from "@/hooks/useFetch";
import { User } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineWhatsapp, MdMailOutline } from "react-icons/md";
import { toast } from "sonner";

const EmployeeContacts = () => {
    const [employees, setEmployees] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { accessToken } = useAuthStore()
    const fetchApi = useFetchApi()

    const getContacts = async () => {
        const res = await fetchApi({
            path: "/user",
            method: "GET",
            accessToken
        })

        const payload = await res.json()
        if (!res.ok) {
            toast.error("An error has occured", {
                description: payload.message
            })
        } else {
            setEmployees(payload as User[])
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getContacts()
    }, [])

    if (isLoading) {
        return(
            <div className="bg-zinc-800 rounded-xl h-64 w-full border text-white animate-pulse"></div>
        )
    }

  return (
    <div className="bg-zinc-800 rounded-xl p-5 w-full border text-white">
        <div>
            <h2 className="text-lg font-semibold">Employee Contacts</h2>
            <p className="text-xs">A list of all of the available employees</p>
        </div>
        <ul className="flex flex-col mt-2 gap-2">
            { employees.map(employee => (
                <div className="flex items-center justify-between rounded-lg p-2 flex text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-amber-700/10" key={employee.id}>
                    <div className="flex items-center gap-4">
                        <Image src={"/avatars/default_avatar.webp"} alt="profile_default" width={32} height={32} className="rounded-full aspect-square object-cover"/>
                        <div>
                            { employee.fullName }
                            <h3 className="text-xs text-zinc-400">{ employee.position }</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="border rounded-lg p-1 hover:text-green-700 hover:border-green-700 cursor-pointer"><MdOutlineWhatsapp size={17}/></div>
                        <div className="border rounded-lg p-1 hover:text-amber-700 hover:border-amber-700 cursor-pointer"><MdMailOutline size={17}/></div>
                    </div>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default EmployeeContacts