import { MdFilterList } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

const FilterTable = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
            <MdFilterList/>
            Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        Wuddup
      </PopoverContent>
    </Popover>
  )
}

export default FilterTable