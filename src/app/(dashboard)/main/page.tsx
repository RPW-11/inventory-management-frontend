import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const products = [
    { id: 1, product: "Laptop", price: 1000, stock: 50 },
    { id: 2, product: "Smartphone", price: 700, stock: 100 },
    { id: 3, product: "Tablet", price: 300, stock: 75 },
    { id: 4, product: "Headphones", price: 100, stock: 200 },
    { id: 5, product: "Smartwatch", price: 250, stock: 150 }
  ];

const ThreeDots = () => {
    return (
        <Button variant={"ghost"} size={"sm"}>
            <div className="flex items-center gap-1">
                <div className="rounded-full bg-black w-1 h-1"></div>
                <div className="rounded-full bg-black w-1 h-1"></div>
                <div className="rounded-full bg-black w-1 h-1"></div>
            </div>
        </Button>
    )
}  
  
const MainPage = () => {
  return (
    <div className="bg-white border rounded-xl px-7 py-5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row max-w-[1000px] md:items-center justify-between gap-2">
            <h2 className="font-bold text-lg">Product List</h2>
            <Input placeholder="Search product by name..." className="h-8 md:w-64"/>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="text-blue-400">
            <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stocks</TableHead>
                <TableHead></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="font-semibold">
            {products.map((product) => (
                <TableRow key={product.id}>
                <TableCell className="font-medium">Hey</TableCell>
                <TableCell>{ product.product }</TableCell>
                <TableCell>Rp. { product.price }</TableCell>
                <TableCell>{ product.stock }</TableCell>
                <TableCell><ThreeDots/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default MainPage