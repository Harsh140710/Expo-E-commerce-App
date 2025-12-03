export interface CartItems extends Document {
    product: () => object
    quantity: number
}