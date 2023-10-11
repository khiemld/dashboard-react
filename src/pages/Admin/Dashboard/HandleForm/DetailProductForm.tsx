import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Box from '@mui/system/Box'
import FormInputText from '../../../../components/FormComponent/FormInputText'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { UpdateProduct} from '../../../../redux/reducers/productSlice/type'
import {  updateProduct } from '../../../../redux/reducers/productSlice/productSlice'
import { TextField } from '@mui/material'
import { FormatDateString } from '../../../../helper/FormatString'
import { Product } from '../../../../redux/reducers/adminSlice/type'
import { PayloadAction } from '@reduxjs/toolkit'
import { getAllProduct } from '../../../../redux/reducers/adminSlice/adminSlice'
import AlertNotification, { closeAlert, openAlert } from '../../../../components/Dialog/AlertNotification'
import { closeDialogDetail } from '../Dialog/DialogDetailProduct'

const styleInput = {
  width: '100%',
  '.MuiFormHelperText-root' : {
    color: 'red'
  }
}

const styleImage = {
  width: '100px',
  height: '100px',
  border: '1px solid #e0e0e0'
}

type DetailProductProps = {
  productDetail: Product
}


function DetailProductForm({ productDetail } : DetailProductProps) {
 
  const [update, setUpdate] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const schema = yup
    .object({
      name: yup.string().required('Please enter product name').min(5, 'Name must be at least 5 characters long'),
      price: yup.number().required('Please enter price').positive('Price is positive number').integer('Price is an integer'),
      description: yup.string().required('Please enter description').min(10, 'Description must be at least 10 characters long')
    })
    .required()

  const { control, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      name: productDetail.name,
      price: productDetail.price,
      description: productDetail.description
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const { errors, touchedFields } = formState
  const hasErrorName = touchedFields.name && errors['name']
  const hasErrorDiscription = touchedFields.description && errors['description']
  const hasErrorPrice = touchedFields.price && errors['price']


  useEffect(() => {
    reset({
      name: productDetail.name,
      description: productDetail.description,
      price: productDetail.price
    })
  }, [productDetail, reset])



  function handleUpdate() {
    dispatch(updateProduct({
      name: getValues('name'),
      price: getValues('price')*1,
      description: getValues('description'),
      id: productDetail.id
    }))
      .then(function (data: PayloadAction<any, string, {
      arg: UpdateProduct
      requestId: string
      requestStatus: string
      }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          dispatch( getAllProduct({
            searchTerm: '',
            page: '1',
            sortBy: '',
            sortType: '',
            active: ''
          })
          )
          openAlert('Update Successful', 'success', () => {})
          closeDialogDetail()
          
          setTimeout(() => closeAlert(), 1000)
         
        }
        else if (data.meta.requestStatus === 'rejected') {
          openAlert('Update Failed', 'error', () => {})
          setTimeout(() => {
            closeAlert()
          }, 1000)
        }
      })
  }

  const handleCancel = () => {
    setUpdate(false)
    reset({
      name: productDetail.name,
      description: productDetail.description,
      price: productDetail.price
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 1.5,
          p: 1
        }}>
          <Box sx={{display: 'flex', gap: 1}}>
            <TextField
              required
              disabled
              label="Id"
              defaultValue={0}
              value={productDetail.id}
              sx={{...styleInput, width: '30%'}}
            />
            <FormInputText
              name = 'name'
              control = {control}
              placeholder='Name'
              error = {!!hasErrorName}
              helperText={errors.name?.message}
              sx={styleInput}
              update = {!update}
            />
          </Box>
          <FormInputText
            name = 'description'
            control = {control}
            placeholder='Description'
            error = {!!hasErrorDiscription}
            helperText={errors.description?.message}
            sx={styleInput}
            update = {!update}
          />
          <Box sx={{display: 'flex', gap: 1}}>
            <FormInputText
              name = 'price'
              control = {control}
              placeholder='Price'
              error = {!!hasErrorPrice}
              helperText={errors.price?.message}
              sx={styleInput}
              update = {!update}
            />
            <TextField
              required
              disabled
              label="Active"
              defaultValue='undefined'
              value={productDetail.active === true ? 'Active' : 'Inactive'}
              sx={styleInput}
            />
          </Box>
          <Box sx={{display: 'flex', gap: 1}}>
            <TextField
              required
              disabled
              label="Created At"
              defaultValue= 'undefined'
              value = {productDetail.createdAt ? FormatDateString(productDetail.createdAt) : 'undefined'}
              sx={styleInput}
            />
            <TextField
              required
              disabled
              label="Updated At"
              defaultValue='undefined'
              value = {productDetail.updatedAt ? FormatDateString(productDetail.updatedAt) : 'undefined'}
              sx={styleInput}
            />
          </Box>

          <Typography variant='h6' fontSize='14px' color='grey.600'>Product Images</Typography>
          <Box
            sx = {{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              overflowY: 'hidden',
              '*::-webkit-scrollbar-track':{ m: 2 },
              py: 1
            }} 
          >
            {productDetail.ProductImage?.map(image => {
              return <img key={image} src={'http://' + image.url} style={{ ...styleImage, objectFit: 'contain' }} />})}
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'end', gap: 1, width: '50%', alignSelf: 'end'}}>
            {
              update === false ?
                <>
                  <Button variant="contained" onClick={() => setUpdate(true)}>Update</Button>
                </>
                :
                <>
                  <Button variant="outlined" onClick={handleCancel} color='warning'>Cancel</Button>
                  <Button variant="contained" onClick={handleUpdate}>Save</Button>
                </>
            }
          </Box>
        </Box>
      </form>
      <AlertNotification />
    </>
   
  )
}

export default DetailProductForm