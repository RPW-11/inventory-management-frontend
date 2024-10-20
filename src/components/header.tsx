import Image from "next/image"
import { MdNotificationsNone, MdAddCircle } from "react-icons/md";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="h-18 p-4 border-b w-full flex items-center justify-between max-w-screen-2xl">
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
            <div className="p-1 rounded-lg border text-amber-700 cursor-pointer hover:bg-zinc-100">
                <MdNotificationsNone size={22}/>
            </div>
            <Button size={"sm"} variant={"outline"} className="flex items-center">Add new product <MdAddCircle className="text-amber-700"/></Button>
        </div>
    </div>
  )
}

export default Header