export type Product = {
    id: string
    name: string
    description: string
    price: number
    stock?: number
    imageUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

export type User = {
    id: string
    fullName: string
    email: string
    position: string
    createdAt: string
    updatedAt: string
}

export type Warehouse = {
    id: string,
    name: string,
    address: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type InventoryDetail = {
    id: number
    warehouseId: string
    warehouseName: string
    warehouseAddress: string
    productQuantity: number
}

export type ProductDetail = {
    product: Product
    inventories: InventoryDetail[]
    imageUrls: string[]
}


// APIs related types
type WarehouseProductRequest = {
    warehouseId: string
    productQuantity: number
}
export type AddProductRequest = {
    productId?: string
    productName: string
    productDescription: string
    productPrice: number
    warehouses: WarehouseProductRequest[]
}

export type SignupResponse = {
    accessToken: string,
    message: string | null
}

export type LoginResponse = {
    accessToken: string,
    message: string | null
}