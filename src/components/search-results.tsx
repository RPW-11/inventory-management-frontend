import { Product, Warehouse } from "@/types"

interface SearchResultsProps {
    results: Product[] | Warehouse[]
    type: "product" | "warehouse"
    onClickResult: (result: Product | Warehouse) => void
}

const SearchResults = ({ results, onClickResult, type }: SearchResultsProps) => {
  return (
    <>
        { results.map(res => (
            <div
              className="px-2 py-1 hover:bg-zinc-200 text-xs rounded font-medium cursor-pointer"
              key={res.id}
              onClick={() => onClickResult(res)}
            >
              <div className="flex items-center gap-2">
                { type === "product" && <div className="rounded w-4 h-4 bg-zinc-100"></div> }
                { res.name }
              </div>
            </div>
        ))}
    </>
  )
}

export default SearchResults