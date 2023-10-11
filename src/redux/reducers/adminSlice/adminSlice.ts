import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState, Params, ResponseType } from './type'
import { axiosInstance, getAuthorizationHeader } from '../../axiosInstance'
import axios from 'axios'


const initialState : InitialState = {
  loading: false,
  items: [],
  pagination: {
    totalItem: 1,
    currentPage: 1,
    limit: 1,
    hasItem: false
  },
  statusCode: 0
}

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllProduct.fulfilled, (state, action: PayloadAction<ResponseType>) => {
      state.loading = false,
      state.statusCode = 201,
      state.items = action.payload.items,
      state.pagination = action.payload.pagination
    })
    builder.addCase(getAllProduct.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
  }
})

export const getAllProduct = createAsyncThunk('product/getAll', async (queryParams : Params) => {
  for (const key of Object.keys(queryParams)) {
    if (Object(queryParams)[key] === '') {
      delete Object(queryParams)[key]
    }
  }
  const response = await axiosInstance.get('/products', {
    params: Object(queryParams)
  })
  return response.data
} )



export default productSlice