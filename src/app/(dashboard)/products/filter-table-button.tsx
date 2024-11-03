import { MdFilterList } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterTableButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
            <MdFilterList/>
            Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="start">
        <h3 className="font-semibold">Filters</h3>
        <div className="font-medium text-xs flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <div className="flex items-center gap-4">
              <Input className="text-xs" placeholder="Min price" type="number"/> to <Input className="text-xs" type="number" placeholder="Max price"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Total Stock</label>
            <div className="flex items-center gap-4">
              <Input className="text-xs" placeholder="Min stock" type="number"/> to <Input className="text-xs" type="number" placeholder="Max stock"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Number of Warehouses</label>
            <div className="flex items-center gap-4">
              <Input className="text-xs" placeholder="Min number" type="number"/> to <Input className="text-xs" type="number" placeholder="Max number"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Created At</label>
            <div className="flex items-center gap-4">
              <Input className="text-xs" placeholder="Start" type="date"/> to <Input className="text-xs" type="date" placeholder="End"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Updated At</label>
            <div className="flex items-center gap-4">
              <Input className="text-xs" placeholder="Start" type="date"/> to <Input className="text-xs" type="date" placeholder="End"/>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterTableButton