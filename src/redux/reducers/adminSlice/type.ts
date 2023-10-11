export type Product = {
  id?: number,
  name: string,
  price: number,
  description: string,
  active?: boolean,
  createdAt?: string,
  updatedAt?: string,
  ProductImage?: string[]
}

type Pagination = {
  totalItem: number,
  currentPage: number,
  limit: number,
  hasItem: boolean
}

export type InitialState = {
  loading: boolean,
  statusCode: number,
  items: Product[],
  pagination: Pagination
}

export type SortType = 'asc' | 'desc'| ''

export type ActiveType = true | false | ''

export type Params = {
  searchTerm: string,
  page: string,
  sortBy: string,
  sortType: SortType,
  active: ActiveType
}

export type ResponseType = {
  items: Product[],
  pagination: Pagination
}
