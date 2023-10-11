import { createSlice } from '@reduxjs/toolkit';
import { InitImageList } from './type';


const initialState : InitImageList = {
  imageList: []
}

const imageSlice = createSlice({
  name: 'imageSlice',
  initialState,
  reducers: {
    resetState: (state) => {
      state.imageList = []
    },
    addImage: (state, action) => {
      state.imageList.push(action.payload)
    },
    deleteImage: (state, action) => {
      state.imageList.splice(action.payload, 1)
    }
  }
})

export const { resetState, addImage, deleteImage } = imageSlice.actions
export default imageSlice