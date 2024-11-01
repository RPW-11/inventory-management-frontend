import { Button } from "./ui/button"

const ThreeDots = () => {
    return (
        <Button variant={"ghost"} size={"sm"} className="h-6">
            <div className="flex items-center gap-0.5">
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
            </div>
        </Button>
    )
}

export default ThreeDots