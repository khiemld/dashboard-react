import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialState, ResponseType } from './type'



const initialState : InitialState = {
  loading: false,
  url: '',
  statusCode: 0
}

const uploadSlice = createSlice({
  name: 'uploadSlice',
  initialState,
  reducers: {
    resetSate: (state) => {
      state.loading= false,
      state.url = '',
      state.statusCode = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(uploadImage.fulfilled, (state, action: PayloadAction<ResponseType>) => {
      state.loading = false,
      state.statusCode = 201,
      state.url = action.payload.url
    })
    builder.addCase(uploadImage.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
  }
})
const prefix_url = import.meta.env.VITE_REACT_API_URL

export const uploadImage = createAsyncThunk('uploadImage', async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  const response = await axios.post(`${prefix_url}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  )
  return response.data
} )


export const { resetSate } = uploadSlice.actions
export default uploadSlice