import { Product, Warehouse } from "@/types"
import { Button } from "./ui/button"

interface SearchResultsProps {
    results: Product[] | Warehouse[]
    onClickResult: (result: Product | Warehouse) => void
}

const SearchResults = ({ results, onClickResult }: SearchResultsProps) => {
  return (
    <div className={`${results.length == 0 && "hidden"} rounded-md border p-1 flex flex-wrap`}>
        { results.map(res => (
            <Button variant={"ghost"} size={"sm"} className="text-xs" key={res.id} onClick={() => onClickResult(res)}>
                { res.name }
            </Button>
        ))}
    </div>
  )
}

export default SearchResults