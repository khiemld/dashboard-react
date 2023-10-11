import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './reducers/accountSlice/accountSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import productSlice from './reducers/adminSlice/adminSlice'
import uploadSlice from './reducers/uploadSlice/uploadSlice'
import productItemSlice from './reducers/productSlice/productSlice'
import imageSlice from './reducers/imageSlice/imageSlice'

const store = configureStore({
  reducer: {
    accountRequest: accountSlice.reducer,
    productRequest: productSlice.reducer,
    uploadRequest: uploadSlice.reducer,
    productItemRequest: productItemSlice.reducer,
    imageRequest: imageSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
