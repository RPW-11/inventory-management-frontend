"use client"
import Image from "next/image"
import { MdNotificationsNone, MdAddCircle } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { useAuthStore } from "@/contexts/useStore";
import { useFetchApi } from "@/hooks/useFetch";
import { toast } from "sonner";

const Header = () => {
    const [user, setUser] = useState<User|null>()
    const [isLoading, setIsLoading] =  useState<boolean>(true)
    const { accessToken } = useAuthStore()
    const fetchApi = useFetchApi()

    const getUserProfile =  async () => {
        const res = await fetchApi({
            path: "/profile",
            method: "GET",
            accessToken
        })

        const payload = await res.json()
        if (!res.ok) {
            toast.error("An error has occured", {
                description: payload.message
            })
        } else {
            setUser(payload as User)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    if (isLoading) {
        return (
            <div className="sticky top-0 z-10 h-18 p-4 border-b w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="animate-pulse bg-zinc-200 rounded-full w-8 h-8"></div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-md w-48 h-4 bg-zinc-200 animate-pulse"></div>
                        <div className="rounded-md w-16 h-4 bg-zinc-200 animate-pulse"></div>
                    </div>
                </div>
                <div className="rounded-md w-48 h-8 bg-zinc-200 animate-pulse"></div>
            </div>
        )
    }

  return (
    <div className="sticky top-0 z-10 h-18 p-4 border-b w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Image
                src={"/avatars/default_avatar.webp"}
                alt={"profile"}
                width={32}
                height={32}
                className="rounded-full aspect-square object-cover"
            />
            <div className="flex flex-col">
                <p className="font-medium text-sm">{ user?.fullName }</p>
                <p className="text-zinc-400 text-xs font-medium">{ user?.position }</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-zinc-100 hover:bg-white rounded-lg hover:border text-zinc-400 hover:text-amber-700 cursor-pointer hover:bg-zinc-100">
                <MdNotificationsNone size={18}/>
            </div>
            {user?.position.toLowerCase() === "admin" && <Link href={"/products/add"}>
                <Button size={"sm"} variant={"outline"} className="flex items-center">Add new product <MdAddCircle className="text-amber-700"/></Button>
            </Link>}
        </div>
    </div>
  )
}

export default Header