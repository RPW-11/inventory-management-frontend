import BreadCrumb from "@/components/breadcrumb"
import ProductTable from "./product-table"

const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-screen-lg m-auto">
      <BreadCrumb/>
      <div className="">
        <h1 className="font-semibold text-xl">Products Inventory Overview</h1>
        <p className="text-sm">View and manage your product listings, including stock levels, pricing, and categories.</p>
        <ProductTable/>
      </div>
    </div>
  )
}

export default ProductsPage