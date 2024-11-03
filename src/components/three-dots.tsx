import { forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button"

const ThreeDots = forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {
    return (
        <Button ref={ref} variant={"ghost"} size={"sm"} className="h-6" {...props}>
            <div className="flex items-center gap-0.5">
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
            </div>
        </Button>
    );
});

export default ThreeDots