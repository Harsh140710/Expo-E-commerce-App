export interface OrderItems extends Document {
    product: object,
    name: string,
    price: number,
    quantity: number,
    image: object
}

export interface ShippingAddress extends Document {
    fullName: string,
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: string
}
