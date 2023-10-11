import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';
import { AuthenticatedUser, InitialState, UserLogin } from './type';
import { saveTokenInLocalStorage } from '../../../service/authService';
import { axiosInstance } from '../../axiosInstance';


const initialState : InitialState = {user: undefined, loading: false, statusCode: 0, data: {accessToken: '' }}

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = undefined,
      state.statusCode = 0,
      state.data.accessToken = '',
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false,
      state.statusCode = 201,
      state.data.accessToken = action.payload
    })
    builder.addCase(loginRequest.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
    builder.addCase(registerRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerRequest.fulfilled, (state, action: PayloadAction<AuthenticatedUser>) => {
      state.loading = false,
      state.user = action.payload,
      state.statusCode = 201
    })
    builder.addCase(registerRequest.rejected, (state) => {
      state.loading = false,
      state.statusCode = 401
    })
  }
})


export const loginRequest = createAsyncThunk('account/loginRequest', async (userLogin : UserLogin) => {
  const response = await axiosInstance.post('/auth/users', {
    username: userLogin.username,
    password: userLogin.password
  }
  )
  const data = response.data.accessToken
  return data
})


export const registerRequest = createAsyncThunk('account/registerRequest', async (userRegister : AuthenticatedUser) => {
  const response = await axiosInstance.post('/users', {
    username: userRegister.username,
    fullname: userRegister.fullname,
    password: userRegister.password,
    email: userRegister.email
  })
  const data = response.data
  return data
})

export const { logOut } = accountSlice.actions
export default accountSlice