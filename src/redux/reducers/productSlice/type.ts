import { Product } from '../adminSlice/type'

export type InitialState = {
  loading: boolean
  statusCode: number
  product: Product
}

export type UpdateProduct = {
  name: string
  price: number
  description: string
  id?: number
}