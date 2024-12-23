"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdAddCircle } from "react-icons/md";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ProductDetail, ProductTableHeader } from "@/types";
import { useAuthStore } from "@/contexts/useStore";
import { useFetchApi } from "@/hooks/useFetch";
import { PRODUCT_TABLE_HEADER as productTableHeader } from "@/constants";
import CellProductTable from "./cell-product-table";
import FilterTableButton from "./filter-table-button";
import ShowTableButton from "./show-table-button";
import ProductOptionsButton from "./product-options-button";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

const ProductTable = () => {
    const { push } = useRouter()
    const [currentHeader, setCurrentHeader] = useState<ProductTableHeader[]>(productTableHeader)
    const [products, setProducts] = useState<ProductDetail[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { accessToken } = useAuthStore()
    const { replace } = useRouter()

    const fetchApi = useFetchApi()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const productName = searchParams.get("name") || ""

    const handleSearchProduct = useDebouncedCallback((searchTerm: string) => {
        const params = new URLSearchParams(searchParams)
        
        if (searchTerm !== "") {
            params.set("name", searchTerm)
        } else {
            params.delete("name")
        }

        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const fetchProductDetails = async () => {
        setIsLoading(true)
        const res = await fetchApi({
          method: "GET",
          path: `/product-inventory` + (productName !== "" ? `?name=${productName}` : ""),
          accessToken
        })
        const payload = await res.json()
        if (!res.ok) {
            toast.error("Error fetching the products' detail", {
                description: payload.message
            })
          setIsLoading(false)
          return
        }
    
        setProducts(payload as ProductDetail[])
        setIsLoading(false)
      }
    
      useEffect(() => {
        fetchProductDetails()
      },[searchParams])

  return (
    <div className="py-4">
        <div className="flex gap-4 items-center">
            <Button variant={"secondary"} size={"sm"} onClick={() => push("/products/add")}>
                <MdAddCircle/>
                Add
            </Button>
            <FilterTableButton/>
            <ShowTableButton currentHeader={currentHeader} setCurrentHeader={setCurrentHeader}/>
            <Input defaultValue={productName} onChange={(e) => handleSearchProduct(e.target.value)} placeholder="Search product by name..." className="md:w-64 text-xs rounded-lg bg-zinc-100 focus:bg-white shadow-none border-none"/>
        </div>
        {isLoading ? 
        <div className="rounded-lg bg-zinc-200 h-48 w-full animate-pulse mt-7 mb-4"></div>
        :
        <Table className="mt-7 mb-4">
            <TableHeader className="text-blue-400">
            <TableRow>
                { currentHeader.map(header => {
                    if (header.isChecked) {
                        return(
                            <TableHead key={header.value}>{ header.value }</TableHead>
                        )
                    }
                })}
                <TableHead></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="font-medium">
            {products.map((product) => (
                <TableRow key={product.product.id}>
                    {currentHeader.map(header => {
                        if (header.isChecked) {
                            return <CellProductTable key={header.value} headerType={header.value} product={product}/>
                        }
                    })}
                    <TableCell align="right"><ProductOptionsButton productDetail={product}/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>}
    </div>
  )
}

export default ProductTable
