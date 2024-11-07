"use client"
import { useAuthStore } from '@/contexts/useStore'
import { useFetchApi } from '@/hooks/useFetch'
import { ProductDetail } from '@/types'
import { BsBox } from "react-icons/bs"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MdFactory } from 'react-icons/md'

const ProductDetailPage = () => {
    const [productDetail, setProductDetail] = useState<ProductDetail>()
    const [displayedIndex, setDisplayedIndex] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const fetchApi = useFetchApi()
    const { accessToken } = useAuthStore()
    const pathNames = usePathname().split("/").slice(1)

    const getProductDetail = async () => {
        setIsLoading(true)
        const res = await fetchApi({
            method: "GET",
            path:`/product-inventory/${pathNames[pathNames.length-1]}`,
            accessToken
        })

        const payload = await res.json()
        if (!res.ok) {
            toast.error("Error fetching the product's detail", {
                description: payload.message
            })
            setIsLoading(false)
            return
        }
      
        setProductDetail(payload as ProductDetail)
        setIsLoading(false)
    }

    useEffect(() => {
        getProductDetail()
    }, [])

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    
  return (
    <div className='grid grid-cols-7 gap-10 font-medium'>
        <div className="col-span-4 flex flex-col gap-6">
            <h1 className='text-3xl font-semibold'>{ productDetail?.product.name }</h1>
            <h3 className="text-xl font-medium">Rp { productDetail?.product.price.toLocaleString() }</h3>
            <div className="">
                <label htmlFor="Product Description" className='text-sm'>DESCRIPTION</label>
                <p className='text-xs'>{ productDetail?.product.description }</p>
            </div>
            <div className='bg-amber-100 p-4 rounded-xl'>
            <label htmlFor="Warehouse and Stock" className='text-sm'>WAREHOUSE AND STOCK</label>
                <div className="flex gap-7 text-sm mt-3">
                    {productDetail?.inventories.map(pd => (
                        <div key={pd.id}>
                            <div className="flex gap-2 items-center"><MdFactory/> { pd.warehouseName }</div>
                            <div className="flex gap-2 items-center"><BsBox/> { pd.productQuantity }</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
            { productDetail && productDetail.imageUrls.length > 0 ?
            <>
            <div className="w-full h-60 rounded-md overflow-hidden rounded-xl border p-4">
                <Image src={productDetail?.imageUrls[displayedIndex] || `/avatars/default_product.webp` } width={0} height={0} alt='display image' className='w-full h-full object-contain' sizes='100vw'/>
            </div>
            <div className="flex gap-1">
                { productDetail?.imageUrls.map((img, i) => (
                    <div className={`w-16 h-16 p-1 overflow-hidden ${i == displayedIndex && 'border-black'} border rounded-md cursor-pointer`} onClick={() => setDisplayedIndex(i)} key={i}>
                        <Image src={img} width={0} height={0} alt='display image' 
                        sizes="100vw" className='w-full h-full object-contain'/>
                    </div>
                ))
                }
            </div>
            </>
            :
            <div className='w-48 h-48 rounded-md bg-zinc-200 flex justify-center items-center text-center m-auto'>This product has no image</div>}
        </div>
    </div>
  )
}

export default ProductDetailPage