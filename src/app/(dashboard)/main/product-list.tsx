import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BsBox } from "react-icons/bs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image';

const products = [
    {
      id: 1,
      product: "Laptop",
      price: 1000,
      stock: 50,
      description: "A high-performance laptop with a 15.6-inch display, 16GB RAM, and 512GB SSD, perfect for both work and entertainment."
    },
    {
      id: 2,
      product: "Smartphone",
      price: 700,
      stock: 100,
      description: "A cutting-edge smartphone featuring a 6.5-inch AMOLED display, 128GB storage, and a triple-camera system for stunning photography."
    },
    {
      id: 3,
      product: "Tablet",
      price: 300,
      stock: 75,
      description: "A lightweight tablet with a 10.1-inch display, 64GB storage, and long battery life, ideal for reading, browsing, and entertainment."
    },
    {
      id: 4,
      product: "Headphones",
      price: 100,
      stock: 200,
      description: "Wireless over-ear headphones with noise cancellation and deep bass, providing a premium sound experience for music lovers."
    },
    {
      id: 5,
      product: "Smartwatch",
      price: 250,
      stock: 150,
      description: "A sleek smartwatch with heart rate monitoring, GPS tracking, and a variety of fitness tracking features, compatible with both iOS and Android."
    }
  ];  

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
  return (
    <div className="bg-white border rounded-xl px-7 py-5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row max-w-[1000px] md:items-center justify-between gap-2">
            <h2 className="font-bold text-lg">Product List</h2>
            <Input placeholder="Search product by name..." className="h-8 md:w-64 text-xs rounded-lg bg-zinc-100 focus:bg-white"/>
        </div>
        <Table>
            <TableHeader className="text-blue-400">
            <TableRow>
                <TableHead></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stocks</TableHead>
                <TableHead></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="font-medium">
            {products.map((product) => (
                <TableRow key={product.id}>
                <TableCell><Image src={`/avatars/default_product.webp`} alt='default product' width={40} height={40} className='rounded-lg'/></TableCell>
                <TableCell>
                    { product.product }
                    <p className="text-xs text-zinc-400">{ product.description.length > 20 ? product.description.substring(0, 60) + "..." : product.description}</p>
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