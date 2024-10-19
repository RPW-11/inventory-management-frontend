import ProductList from "./product-list"
import EmployeeContacts from "./employee-contacts"
  
const MainPage = () => {
  return (
    <div className="bg-white grid grid-rows-2 h-full gap-4">
       <div className="row-span-1 flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Main dashboard</h2>
          <p className="text-xs">A quick way to monitor and analyze your company.</p>
        </div>
        <EmployeeContacts/>
       </div>
       <div className="row-span-1">
        <ProductList/>
       </div>
    </div>
  )
}

export default MainPage