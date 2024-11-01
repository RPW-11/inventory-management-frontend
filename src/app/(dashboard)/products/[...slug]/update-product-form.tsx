"use client"
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { PRODUCT_FORM_SCHEMA as productFormSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import WarehouseAddForm from "./warehouse-add";
import ProductAdd from "./product-add";
import { AddProductRequest, Product } from "@/types";
import { useState } from "react";
import { useFetchApi } from "@/hooks/useFetch";
import { useAuthStore } from "@/contexts/useStore";
import { toast } from "sonner";


const UpdateProductForm = () => {
    const [product, setProduct] = useState<Product>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fetchApi = useFetchApi()
    const { accessToken } = useAuthStore()

    const defaultValuesForm = {
        productName: "",
        productDescription: "",
        productPrice: 0,
        warehouses: [{
            warehouseId: "",
            productQuantity: 1
        }],
        productImages: []
    }
    const updateProductForm = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: defaultValuesForm
    })

    const { fields, append, remove } = useFieldArray({
        control: updateProductForm.control,
        name: "warehouses"
    })

    const updateProduct = async (productRequestValues: AddProductRequest, productImages: File[]) => {

        let res = await fetchApi({
            method: "POST",
            body: JSON.stringify(productRequestValues),
            accessToken,
            path: "/inventory"
        })

        if (!res.ok) {
            const error = await res.json()
            toast.error("Failed to add the product", { description: error.message })
            return
        }

        const payload = await res.json()

        const form = new FormData()
        productImages.forEach(imgFile => {
            form.append("product_imgs", imgFile)
        })


        res = await fetchApi({
            method: "POST",
            body: form,
            path: `/product-images/${payload.productId}`,
            isFormData: true,
            accessToken
        })

        if (!res.ok) {
            const error = await res.json()
            toast.error("Failed to add the product's images", { description: error.message })
            return
        }

        updateProductForm.reset(defaultValuesForm)
        toast.success("Product has been added successfully", {
            description: new Date().toISOString()
        })
    }

    const onSubmitUpdate = (values: z.infer<typeof productFormSchema>) => {
        let { productImages, ...productRequestValues } = values
        if (product) {
            (productRequestValues as AddProductRequest).productId = product.id
        }
        
        setIsLoading(true)

        updateProduct(productRequestValues, productImages).finally(() => setIsLoading(false))
    }

  return (
    <Form {...updateProductForm}>
      <form onSubmit={updateProductForm.handleSubmit(onSubmitUpdate)} className="space-y-4">
            <ProductAdd updateProductForm={updateProductForm} setProduct={setProduct}/>
            <FormField
            control={updateProductForm.control}
            name="productDescription"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Product's Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Enter product's description..." {...field}/>
                </FormControl>
                <FormDescription>
                    Enter a description to your product
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={updateProductForm.control}
            name="productPrice"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Product's Price</FormLabel>
                <FormControl>
                    <Input placeholder="Enter product's price..." {...field} type="number"/>
                </FormControl>
                <FormDescription>
                    Enter the product's price
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            { fields.map((item, i) => (
                <div className="border rounded-lg p-4 flex flex-col gap-2" key={item.id}>
                    <WarehouseAddForm updateProductForm={updateProductForm} index={i}/>
                    {fields.length > 1 && <Button size={"sm"} variant={"destructive"} type="button" className="w-fit" onClick={() => remove(i)}>Delete</Button>}
                </div>
            ))}
            <Button size={"sm"} variant={"secondary"} type="button" className="w-fit" onClick={() => append({ warehouseId: "", productQuantity: 1 })}>Add new warehouse</Button>

            <FormField
            control={updateProductForm.control}
            name="productImages"
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                    <Input {...fieldProps} 
                    placeholder="Product Image" 
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={(event) =>
                        onChange([...Array.from(event.target.files ?? [])])
                    }/>
                </FormControl>
                <FormDescription>
                    Only .png and .jpg or .jpeg are accepted
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isLoading}>Update Product</Button>
      </form>
    </Form>
  )
}

export default UpdateProductForm