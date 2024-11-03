import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MdOutlineInfo, MdDeleteOutline, MdChangeHistory } from "react-icons/md";
import { ProductDetail } from '@/types'
import ThreeDots from '@/components/three-dots'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const ProductOptionsButton = ({ productDetail }: { productDetail: ProductDetail}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ThreeDots/>
      </PopoverTrigger>
      <PopoverContent className="w-32 flex flex-col gap-2 text-sm p-1" align="end">
        <Link href={`/products/${productDetail.product.id}`} className='w-full' target="_blank">
          <Button variant={"ghost"} size={"sm"} className='gap-2 justify-start w-full'> <MdOutlineInfo/> Detail</Button>
        </Link>
        <Separator/>
        <Button variant={"ghost"} size={"sm"} className='gap-2 justify-start hover:text-amber-700'> <MdChangeHistory/> Update</Button>
        <DeleteAlert/>
      </PopoverContent>
    </Popover>
  )
}

const DeleteAlert = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='flex'>
        <Button variant={"ghost"} size={"sm"} className='gap-2 justify-start hover:text-red-500 w-full'> <MdDeleteOutline/> Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 hover:bg-red-700'>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default ProductOptionsButton