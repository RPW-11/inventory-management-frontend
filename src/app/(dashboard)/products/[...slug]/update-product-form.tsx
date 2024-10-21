"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PRODUCT_FORM_SCHEMA as productFormSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const UpdateProductForm = () => {
    const updateProductForm = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
    })


    const onSubmitUpdate = async (values: z.infer<typeof productFormSchema>) => {
        console.log(values);
    }

  return (
    <Form {...updateProductForm}>
      <form onSubmit={updateProductForm.handleSubmit(onSubmitUpdate)} className="space-y-4">
            <FormField
            control={updateProductForm.control}
            name="productName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter or search your product..." {...field} />
                </FormControl>
                <FormDescription>
                    If your product doesn't appear, it will create a new one
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
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
            <FormField
            control={updateProductForm.control}
            name="productQuantity"
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
            <FormField
            control={updateProductForm.control}
            name="warehouseName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Warehouse</FormLabel>
                <FormControl>
                    <Input placeholder="Enter warehouses..." {...field} type="text"/>
                </FormControl>
                <FormDescription>
                    Enter the warehouse in which the product will be stored
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
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
                    Upload the product images
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Update Product</Button>
      </form>
    </Form>
  )
}

export default UpdateProductForm