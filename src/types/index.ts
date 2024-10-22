export type Product = {
    id: string
    name: string
    description: string
    price: number
    stock?: number
    createdAt?: Date
    updatedAt?: Date
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
}


// APIs related types
export type SignupResponse = {
    accessToken: string,
    message: string | null
}

export type LoginResponse = {
    accessToken: string,
    message: string | null
}