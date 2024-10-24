import Image from "next/image"
import { MdNotificationsNone, MdAddCircle } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
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
                <p className="font-medium text-sm">Ida Bagus Kade Rainata Putra Wibawa</p>
                <p className="text-zinc-400 text-xs font-medium">Staff</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-zinc-100 hover:bg-white rounded-lg hover:border text-zinc-400 hover:text-amber-700 cursor-pointer hover:bg-zinc-100">
                <MdNotificationsNone size={18}/>
            </div>
            <Link href={"/products/add"}>
                <Button size={"sm"} variant={"outline"} className="flex items-center">Add new product <MdAddCircle className="text-amber-700"/></Button>
            </Link>
        </div>
    </div>
  )
}

export default Header