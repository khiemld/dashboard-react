import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialState, ProductItem, UpdateProduct } from './type'
import { Product } from '../adminSlice/type'
import { axiosInstance } from '../../axiosInstance'


const initialState : InitialState = {
  loading: false,
  statusCode: 0,
  product: {
    id: 0,
    name: '',
    price: 0,
    description: '',
    active: undefined,
    createdAt: '',
    updatedAt: '',
    ProductImage: ['']
  }
}

const productItemSlice = createSlice({
  name: 'productItemSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //=================Create Product==================
    builder.addCase(productCreate.pending, (state) => {
      state.loading = true
    })
    builder.addCase(productCreate.fulfilled, (state) => {
      state.loading = false,
      state.statusCode = 201
    })
    builder.addCase(productCreate.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
    //=================Get Product==================
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false,
      state.statusCode = 201,
      state.product = action.payload
    })
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
    //=================Update Product==================
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false,
      state.statusCode = 201
    })
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
    //=================Delete Product==================
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false,
      state.statusCode = 201
    })
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
  }
})

export const productCreate = createAsyncThunk('product/create', async (product : Product) => {
  const response = await axiosInstance.post('products', {
    name: product.name,
    price: product.price,
    description: product.description,
    images: product.ProductImage
  }
  )
  return response.data
})

export const getProduct = createAsyncThunk('product/getOne', async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`)
  return response.data
})

export const updateProduct = createAsyncThunk('product/update', async (product : UpdateProduct) => {
  const response = await axiosInstance.put(`/products/${product.id}`, {
    name: product.name,
    price: product.price,
    description: product.description
  }
  )
  return response.data
})

export const deleteProduct = createAsyncThunk('product/delete', async (id: number) => {
  const response = await axiosInstance.delete(`/products/${id}`)
  return response.data
})


export default productItemSlice