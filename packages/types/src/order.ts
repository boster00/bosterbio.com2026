export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled"
  | "refunded"

export interface Order {
  id: string
  displayId: string
  status: OrderStatus
  createdAt: string
  totalFormatted: string
  items: Array<{
    title: string
    quantity: number
    unitPriceFormatted: string
  }>
}
