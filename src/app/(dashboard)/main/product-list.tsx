"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BsBox } from "react-icons/bs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFetchApi } from '@/hooks/useFetch';
import { useAuthStore } from '@/contexts/useStore';
import { Product, ProductDetail } from '@/types';

const ThreeDots = () => {
    return (
        <Button variant={"ghost"} size={"sm"} className="h-6">
            <div className="flex items-center gap-0.5">
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
                <div className="rounded-full bg-black w-[3px] h-[3px]"></div>
            </div>
        </Button>
    )
}  
const ProductList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string|null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const { accessToken } = useAuthStore()
  const fetchApi = useFetchApi()

  const fetchProductDetails = async () => {
    const res = await fetchApi({
      method: "GET",
      path: "/product-inventory",
      accessToken
    })
    const payload = await res.json()
    if (!res.ok) {
      setError(payload.message)
      setIsLoading(false)
      return
    }

    setProducts(payload.map((productDetail:ProductDetail) => {
      const stock = productDetail.inventories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.productQuantity
      }, 0)
      const imgUrl = productDetail.imageUrls.length > 0 ? productDetail.imageUrls[0] : undefined
      const newProduct: Product = {...productDetail.product, stock, imageUrl: imgUrl}
      return newProduct
    }))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProductDetails()
  },[])

  if (isLoading) {
    return (
      <div className="w-full h-48 animate-pulse bg-zinc-200 rounded-xl"></div>
    )
  }

  return (
    <div className="bg-white border rounded-2xl px-7 py-5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row max-w-[1000px] md:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg">Product List</h2>
              <p className="text-xs">This table shows the recently updated products</p>
            </div>
            <Input placeholder="Search product by name..." className="md:w-64 text-xs rounded-lg bg-zinc-100 focus:bg-white shadow-none border-none"/>
        </div>
        <Table>
            <TableHeader className="text-blue-400">
            <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stocks</TableHead>
                <TableHead></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="font-medium">
            {products.map((product) => (
                <TableRow key={product.id}>
                <TableCell className='flex gap-4 items-center'>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    <Image 
                      src={product.imageUrl ? product.imageUrl : `/avatars/default_product.webp`} 
                      alt='default product' 
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                    <div>
                      { product.name }
                      <p className="text-xs text-zinc-400">{ product.description.length > 20 ? product.description.substring(0, 60) + "..." : product.description}</p>
                    </div>
                </TableCell>
                <TableCell>Rp. { product.price }</TableCell>
                <TableCell >
                    <div className="flex items-center gap-2"><BsBox/> { product.stock }</div>
                </TableCell>
                <TableCell align="right"><ThreeDots/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default ProductList