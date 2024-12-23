import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { UseFormReturn } from "react-hook-form";
import SearchResults from "@/components/search-results";
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from "react";
import { useFetchApi } from "@/hooks/useFetch";
import { useAuthStore } from "@/contexts/useStore";

interface Props {
    updateProductForm: UseFormReturn<{
        productName: string;
        productDescription: string;
        productPrice: number;
        warehouses: {
            warehouseId: string;
            productQuantity: number;
        }[];
        productImages: File[];
    }, any, undefined>,
    setProduct : (newProduct: Product | undefined) => void
}

const ProductAdd = ({ updateProductForm, setProduct }: Props) => {
    const [products, setProducts] = useState<Product[]>([])
    const [searchProductString, setSearchProductString] = useState<string>("")
    const [productName, setProductName] = useState<string>("")
    const fetchApi = useFetchApi()
    const { accessToken } = useAuthStore()

    const debouncedSetSearchProductString = useDebouncedCallback((searchTerm: string) => {
        setSearchProductString(searchTerm);
    }, 300);

    const onCreateProductClick = () => {
        setProducts([])
        setSearchProductString("")
        setProduct(undefined)
    }

    const onClickProduct = (product: Product) =>  {
        setProductName(product.name)
        setProduct(product)
        setProducts([])
        setSearchProductString("")
    }

    const searchProduct = async () => {
        if (searchProductString.length >= 3) {
            const res = await fetchApi({
                method: "GET",
                path: `/product?name=${searchProductString}`,
                accessToken
            })
    
            if (!res.ok) {
    
                return
            }
    
            const payload:Product[] = await res.json()
            setProducts(payload)
            return
        }
        setProducts([])
    }

    useEffect(() => {
        searchProduct()
    }, [searchProductString])

  return (
    <>
        <FormField
        control={updateProductForm.control}
        name="productName"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
                <Input placeholder="Enter or search your product..." 
                {...field} 
                value={productName}
                onChange={(e) => {
                    setProductName(e.target.value)
                    debouncedSetSearchProductString(e.target.value)
                    field.onChange("")
                }}/>
            </FormControl>
            <div className={`${searchProductString.length < 3 && "hidden"} rounded-md border p-1 flex flex-wrap gap-4`}>
                <div className={`flex flex-wrap ${products.length === 0 && "hidden"}`}>
                    <SearchResults results={products}
                    onClickResult={(value:any) => {
                        onClickProduct(value as Product)
                        field.onChange((value as Product).name)
                    }}
                    type="product"/>
                </div>
                <div className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-xs rounded font-medium cursor-pointer" 
                onClick={() => {
                    field.onChange(searchProductString)
                    onCreateProductClick()
                }}> 
                    Create { searchProductString }
                </div>
            </div>
            <FormDescription>
                If your product doesn't appear, it will create a new one
            </FormDescription>
            <FormMessage />
            </FormItem>
        )}
        />
    </>
  )
}

export default ProductAdd