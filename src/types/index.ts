export type Product = {
    id: string
    name: string
    description: string
    price: number
    createdAt: Date
    updatedAt: Date
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

