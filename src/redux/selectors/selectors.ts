import { useSelector } from "react-redux"
import { InitialState } from "../reducers/adminSlice/type"
import { RootState } from "../store"
import { useState } from "react"

export const ProductSelector = () => {
  const productState = useSelector<RootState, InitialState>((state) => state.productRequest)
  
  return productState
}