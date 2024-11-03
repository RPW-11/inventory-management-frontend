import { MdRemoveRedEye } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductTableHeader } from "@/types";

const ShowTableButton = ({ currentHeader, setCurrentHeader }: 
    {currentHeader: ProductTableHeader[], setCurrentHeader: (newHeader: ProductTableHeader[]) => void}) => {

        const onClickCheckbox = (headerValue: string) => {
            const newHeader = currentHeader.map(header => {
                if (header.value === headerValue) {
                    header.isChecked = !header.isChecked
                }
                return header
            })
            setCurrentHeader(newHeader)
        }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
            <MdRemoveRedEye/>
            Show
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 grid grid-cols-3 gap-2" align="start">
        { currentHeader.map(header => (
            <div className="col-span-1 flex items-center space-x-2" key={header.value}>
                <Checkbox id={header.value} checked={header.isChecked} onClick={() => onClickCheckbox(header.value)}/>
                <label htmlFor={header.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    { header.value }
                </label>
            </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default ShowTableButton