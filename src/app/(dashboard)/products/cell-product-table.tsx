import { TableCell } from '@/components/ui/table'
import Image from 'next/image'
import { ProductDetail } from '@/types'
import React from 'react'
import { BsBox } from 'react-icons/bs'

const CellProductTable = ({ headerType, product }: { headerType: string, product: ProductDetail }) => {
  switch(headerType) {
    case "Product":
        return (
            <TableCell className='flex gap-4 items-center'>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    <Image 
                    src={product.imageUrls ? product.imageUrls[0] : `/avatars/default_product.webp`} 
                    alt='default product'
                    width={100}
                    height={100}
                    className='object-cover w-full h-full'
                    />
                </div>
                <div>
                    { product.product.name }
                    <p className="text-xs text-zinc-400">{ product.product.description.length > 20 ? product.product.description.substring(0, 60) + "..." : product.product.description}</p>
                </div>
            </TableCell>
        )
    case "Price":
        return (<TableCell>Rp. { product.product.price }</TableCell>)
    case "Total Stock":
        return (
            <TableCell >
                <div className="flex items-center gap-2"><BsBox/> { product.inventories[0].productQuantity }</div>
            </TableCell>
        )
    case "Warehouses":
        return (<TableCell>{ product.inventories.length }</TableCell>)
    case "Created At":
        return (<TableCell>{ product.product.createdAt ? new Date(product.product.createdAt).toDateString() : "Unknown"  }</TableCell>)
    case "Updated At":
        return (<TableCell>{ product.product.updatedAt ? new Date(product.product.updatedAt).toDateString() : "Unknown" }</TableCell>)
    default:
        return(<TableCell></TableCell>)
  }
}

export default CellProductTable