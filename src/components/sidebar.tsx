"use client"
import Link from "next/link";
import { useState } from 'react';
import { MdMenu, MdMenuBook, MdMenuOpen } from "react-icons/md";
import { COMPANY_NAME as companyName, SIDEBAR_MENU as sidebarMenu } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${isOpen ? 'w-64' : 'w-[70px]'} bg-white h-screen text-black flex flex-col transition-all duration-300`}>
        <div className="w-full px-6 h-16 flex justify-between items-center">
            <h2 className={`${!isOpen && 'hidden'} text-md font-bold whitespace-nowrap`}>{ companyName }</h2>
            {isOpen ? <MdMenuOpen size={20} onClick={toggleSidebar} className="cursor-pointer text-zinc-400 hover:text-black"/> : <MdMenu size={20} onClick={toggleSidebar} className="cursor-pointer text-zinc-400 hover:text-black"/>}
        </div>
        <nav className="flex-1 py-4 text-sm font-semibold">
            { sidebarMenu.map(menu => (
                <>
                <h3 className="px-6 text-xs leading-4 tracking-[0.2rem] h-8">{ isOpen && menu.sectionName.toUpperCase() }</h3>
                <ul className="flex flex-col gap-4">
                    { menu.contents.map(content => (
                        <li className="relative">
                            <div className={`rounded-full w-2 absolute -left-1 h-full bg-amber-700 ${pathName.split("/")[1] !== content.url.toLowerCase() && "hidden"}`}></div>
                            <Link href={content.url} className={`block px-6 py-2 hover:bg-zinc-100 rounded ${pathName.split("/")[1] !== content.url.toLowerCase() && "text-zinc-400"}`}>
                                <div className="flex items-center gap-2">
                                    <content.icon size={20} className={`${pathName.split("/")[1] !== content.url.toLowerCase() ? "text-zinc-400" : "text-amber-700"}`}/>
                                    { isOpen && content.name }
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                </>
            ))
            }
        </nav>
    </div>
  );
};

export default Sidebar;

  