"use client"
import Link from "next/link";
import { useState } from 'react';
import { MdMenu, MdMenuOpen, MdLogout } from "react-icons/md";
import { COMPANY_NAME as companyName, SIDEBAR_MENU as sidebarMenu } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/contexts/useStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  
  const router = useRouter();
  const { clearAccessToken } = useAuthStore()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("jwt_access_token")
    clearAccessToken()
    router.push("/auth/sign-in")
  }

  return (
    <div className={`${isOpen ? 'w-64' : 'w-[70px]'} bg-white h-screen text-black flex flex-col transition-all duration-300 border-r`}>
        <div className="w-full px-6 h-16 flex justify-between items-center">
            <h2 className={`${!isOpen && 'hidden'} text-md font-bold whitespace-nowrap`}>{ companyName }</h2>
            {isOpen ? <MdMenuOpen size={20} onClick={toggleSidebar} className="cursor-pointer text-zinc-400 hover:text-black"/> : <MdMenu size={20} onClick={toggleSidebar} className="cursor-pointer text-zinc-400 hover:text-black"/>}
        </div>
        <nav className="flex-1 py-4 text-sm font-semibold">
            { sidebarMenu.map(menu => (
                <div key={menu.sectionName}>
                    <h3 className="px-6 text-xs leading-4 tracking-[0.2rem] h-8">{ isOpen && menu.sectionName.toUpperCase() }</h3>
                    <ul className="flex flex-col gap-4">
                        { menu.contents.map(content => (
                            <li className="relative" key={content.url}>
                                <div className={`rounded-full w-2 absolute -left-1 h-full bg-amber-700 ${!pathName.startsWith(content.url) && "hidden"}`}></div>
                                <Link href={content.url} className={`block px-6 py-2 hover:bg-zinc-100 rounded ${!pathName.startsWith(content.url) && "text-zinc-400"}`}>
                                    <div className="flex items-center gap-4">
                                        <content.icon size={20} className={`${!pathName.startsWith(content.url) ? "text-zinc-400" : "text-amber-700"}`}/>
                                        { isOpen && content.name }
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))
            }
        </nav>
        <div className="px-6 py-2 mb-4 cursor-pointer text-zinc-400 hover:text-red-600 hover:bg-zinc-100 flex items-center gap-4 font-semibold text-sm" onClick={logout}>
            <MdLogout size={20}/> 
            { isOpen && "Logout" }
        </div>
    </div>
  );
};

export default Sidebar;

  