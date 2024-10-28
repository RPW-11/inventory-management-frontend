import { MdDashboard, MdAnalytics, MdFactory, MdSupervisedUserCircle, MdOutlineShoppingCart } from "react-icons/md";
import { z } from "zod";

export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME
export const PUBLIC_API = process.env.NEXT_PUBLIC_API
export const SIDEBAR_MENU = [
    {
        sectionName: "Menu",
        contents: [
            {
                name: 'Main',
                url: '/main',
                icon: MdDashboard
            },
            {
                name: 'Analytics',
                url: '/analytics',
                icon: MdAnalytics
            },
            {
                name: 'Products',
                url: '/products',
                icon: MdOutlineShoppingCart
            },
            {
                name: 'Warehouses',
                url: '/warehouses',
                icon: MdFactory
            },
            {
                name: 'Employees',
                url: '/employees',
                icon: MdSupervisedUserCircle
            }
        ]
    }
]
export const LOGIN_FORM_SCHEMA = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(1, {message: "Password can't be empty"})
})
export const SIGNUP_FORM_SCHEMA = z.object({
    fullName: z.string().min(3, {message: "Full name must be at least 3 characters long"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 chracters long"})
})

const MAX_FILE_SIZE = 5000000
export const PRODUCT_FORM_SCHEMA = z.object({
    productName: z.string().min(3, {message: "Product name must be at least 3 characters long"}),
    productDescription: z.string().min(1, {message: "Product description must not be empty"}),
    productPrice: z.coerce.number().min(1, {message: "Product price cannot be negative or zero"}),
    warehouses: z.array(z.object({
        warehouseId: z.string().min(1, {message: "Warehouse must not be empty"}),
        productQuantity: z.coerce.number().min(1, {message: "Product quantity cannot be negative or zero"})
    })),
    productImages: z.array(
        z.custom<File>(val => val instanceof File, 'Please upload a file')
        .refine((file) => (file.type === "image/jpeg" || file.type === "image/png"), "Invalid File!")
        .refine((file) => file?.size !== 0, "File is required")
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max size is 5MB.")
    )
})
