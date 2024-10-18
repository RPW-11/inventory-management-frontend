import { MdDashboard, MdAnalytics, MdFactory, MdSupervisedUserCircle } from "react-icons/md";
import { z } from "zod";

export const COMPANY_NAME = "Ryujin Jakka"
export const SIDEBAR_MENU = [
    {
        sectionName: "Menu",
        contents: [
            {
                name: 'Main',
                url: 'main',
                icon: MdDashboard
            },
            {
                name: 'Analytics',
                url: 'analytics',
                icon: MdAnalytics
            },
            {
                name: 'Warehouses',
                url: 'warehouses',
                icon: MdFactory
            },
            {
                name: 'Employees',
                url: 'employees',
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