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


const UpdateProductForm = () => {
    const updateProductForm = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            inventory: [{
                warehouseId: "",
                productQuantity: 1
            }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: updateProductForm.control,
        name: "inventory"
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