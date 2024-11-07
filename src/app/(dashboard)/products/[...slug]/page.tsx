import { notFound } from 'next/navigation'
import BreadCrumb from '@/components/breadcrumb'
import UpdateProductForm from './update-product-form'
import ProductDetailPage from './product-detail'

const AddUpdateProductPage = ({ params }: { params: { slug: string[] } }) => {
    if (params.slug[0] !== "add" && params.slug[0] !== "update" && params.slug[0].length !== 36 
      || params.slug[0] === "add" && params.slug.length > 1 
      || params.slug[0].length === 36 && params.slug.length > 1
      || params.slug[0] === "update" && !(params.slug.length == 2) ) {
        return notFound()
    }

    const title = params.slug[0] === "add" ? "Add products to your inventory" : "Modify products from your inventory"
    const description = "Click the \"New Entry\" to add more products"
    return (
      <div className='flex flex-col gap-4 w-full max-w-screen-lg m-auto'>
          <BreadCrumb />
          { params.slug[0].length === 36 ? 
            <ProductDetailPage/>
          :
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h2 className="font-medium text-lg">{ title }</h2>
                <p className="text-xs">{ description }</p>
              </div>
              <UpdateProductForm/>
            </div>
          }
      </div>
    )
}

export default AddUpdateProductPage