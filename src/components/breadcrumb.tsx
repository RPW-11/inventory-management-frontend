"use client"
import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "./ui/breadcrumb"
import { usePathname } from "next/navigation"

const BreadCrumb = () => {
    const pathNames = usePathname().split("/").slice(1)
    let current = ""
    let breacrumbItems = pathNames.map((path, i) => {
        current = current + "/" + path
        return (
            <React.Fragment key={path}>
            <BreadcrumbItem>
                <BreadcrumbLink href={current} className="font-medium text-xs">{ path[0].toLocaleUpperCase() + path.slice(1) }</BreadcrumbLink>
            </BreadcrumbItem> 
            {i !== pathNames.length-1 && <BreadcrumbSeparator/>}
            </React.Fragment>
        )
    })

  return (
    <Breadcrumb>
        <BreadcrumbList>
            { breacrumbItems }
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb