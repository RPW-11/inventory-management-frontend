import { MdDashboard, MdAnalytics, MdFactory, MdSupervisedUserCircle } from "react-icons/md";

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