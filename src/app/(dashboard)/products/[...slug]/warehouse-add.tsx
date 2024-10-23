import { UseFormReturn } from "react-hook-form"
import SearchResults from "@/components/search-results";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Warehouse } from "@/types";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFetchApi } from "@/hooks/useFetch";
import { useAuthStore } from "@/contexts/useStore";

interface Props {
    updateProductForm: UseFormReturn<{
        productName: string;
        productDescription: string;
        productPrice: number;
        inventory: {
            warehouseId: string;
            productQuantity: number;
        }[];
        productImages: File[];
    }, any, undefined>,
    index: number
}

const WarehouseAddForm = ({ updateProductForm, index }: Props) => {
    const [searchWarehouseString, setSearchWarehouseString] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Warehouse[]>([])
    const [warehouse, setWarehouse] = useState<Warehouse>({
        id: "",
        name: "",
        address: ""
    })
    const fetchApi = useFetchApi()
    const { accessToken } = useAuthStore()

    const onChangeWarehouse = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWarehouseString(event.target.value)
        const newWarehouse = warehouse
        newWarehouse.name = event.target.value
        setWarehouse(newWarehouse)
    }

    const searchWarehouse = async () => {
        if (searchWarehouseString !== "" ){
            const res = await fetchApi({
                method: "GET",
                path: `/warehouse?name=${searchWarehouseString}`,
                accessToken
            })
            if (!res.ok) {
                // do something with the error
                return
            }
            const payload:Warehouse[] = await res.json()
            setSearchResults(payload)
            return
        }
        setSearchResults([])
    }

    const onClickWarehouse = (warehouse: Warehouse) =>  {
        setWarehouse(warehouse)
        setSearchResults([])
    }

    useEffect(() => {
        searchWarehouse()
    }, [searchWarehouseString])

  return (
    <div className="grid grid-cols-6 gap-7">
        <div className="col-span-4">
        <FormField
            control={updateProductForm.control}
            name={`inventory.${index}.warehouseId`}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Warehouse</FormLabel>
                <FormControl>
                    <Input placeholder="Enter warehouse..." 
                    {...field} 
                    value={warehouse.name}
                    type="text" 
                    onChange={(e) => {
                        onChangeWarehouse(e)
                        field.onChange("")
                    }}/>
                </FormControl>
                <SearchResults results={searchResults} 
                onClickResult={(value:any) => {
                    onClickWarehouse(value as Warehouse)
                    field.onChange((value as Warehouse).id)
                }}/>
                <FormDescription>
                    Enter the warehouse in which the product will be stored
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        </div>
        <div className="col-span-2">    
        <FormField
            control={updateProductForm.control}
            name={`inventory.${index}.productQuantity`}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Product's Quantity</FormLabel>
                <FormControl>
                    <Input placeholder="Enter product's quantity..." {...field} type="number"/>
                </FormControl>
                <FormDescription>
                    Enter the product's quantity
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        </div>
    </div>
  )
}

export default WarehouseAddForm