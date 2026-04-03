export interface CartItem {
  id: string
  variantId: string
  productId: string
  title: string
  thumbnail?: string
  quantity: number
  unitPriceFormatted: string
  totalFormatted: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotalFormatted: string
  taxFormatted: string
  totalFormatted: string
  shippingAddressId?: string
}
