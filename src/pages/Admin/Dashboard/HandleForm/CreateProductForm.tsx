import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Box from '@mui/system/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { uploadImage } from '../../../../redux/reducers/uploadSlice/uploadSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import FormInputText from '../../../../components/FormComponent/FormInputText'
import Typography from '@mui/material/Typography'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { productCreate } from '../../../../redux/reducers/productSlice/productSlice'
import { Product } from '../../../../redux/reducers/adminSlice/type'
import AlertNotification, { closeAlert, openAlert } from '../../../../components/Dialog/AlertNotification'
import { closeDialogCreate } from '../Dialog/DialogCreateProduct'
import { getAllProduct } from '../../../../redux/reducers/adminSlice/adminSlice'
import { addImage, deleteImage, resetState } from '../../../../redux/reducers/imageSlice/imageSlice'
import { InitImageList } from '../../../../redux/reducers/imageSlice/type'
import {v4 as uuidv4} from 'uuid'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

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
  // objectFit: 'contain'
}


function CreateProductForm() {

  const schema = yup
    .object({
      name: yup.string().required('Please enter product name').min(5, 'Name must be at least 5 characters long'),
      price: yup.number().required('Please enter price').positive('Price is positive number').integer('Price is an integer'),
      description: yup.string().required('Please enter description').min(10, 'Description must be at least 10 characters long'),
      image: yup.array().required('Please upload image')
    })
    .required()

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: ['']
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const { errors, touchedFields } = formState
  const hasErrorName = touchedFields.name && errors['name']
  const hasErrorDiscription = touchedFields.description && errors['description']
  const hasErrorPrice = touchedFields.price && errors['price']

  const [image, setImage] = useState<File>()
  const handleImage = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setImage(e.target.files[0])
  }

  const imageState = useSelector<RootState, InitImageList>((state) => state.imageRequest)
  const imgList = imageState.imageList
  const dispatch = useDispatch<AppDispatch>()

  async function handleUpload() {
    if (image) {
      await dispatch(uploadImage(image)).then(function (data: PayloadAction<any, string, {
        arg: File
        requestId: string
        requestStatus: string
        }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          dispatch(addImage(data.payload))
        }
      })
    }
  }

  useEffect(() => {
    dispatch(resetState())
  } , [])

  console.log(imgList)
  const handleCreate = (values : Product) => {
    dispatch(productCreate({
      name: values.name,
      description: values.description,
      price: values.price,
      ProductImage: imgList.map((image) => image.url)
    })).then(function (data: PayloadAction<any, string, {
      arg: Product
      requestId: string
      requestStatus: string
      }>) {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(getAllProduct({
          searchTerm: '',
          page: '1',
          sortBy: '',
          sortType: '',
          active: ''
        })
        )
        openAlert('Create Successful', 'success', () => {})
        setTimeout(() => {
          closeAlert()
        }, 1000)
        closeDialogCreate()
        
      }
      else if (data.meta.requestStatus === 'rejected') {
        openAlert('Create Failed', 'error', () => {})
        setTimeout(() => {
          closeAlert()
        }, 1000)
      }
    })
  }

  const handleDeteleImage = (index: number) => {
    dispatch(deleteImage(index))
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 1.5,
          p: 1
        }}>
          <FormInputText
            name = 'name'
            control = {control}
            placeholder='Name'
            error = {!!hasErrorName}
            helperText={errors.name?.message}
            sx={styleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              )
            }}
          />
          <FormInputText 
            name = 'description'
            control = {control}
            placeholder='Description'
            error = {!!hasErrorDiscription}
            helperText={errors.description?.message}
            sx={styleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              )
            }}
          />
          <FormInputText
            name = 'price'
            control={control}
            placeholder='Price'
            error = {!!hasErrorPrice}
            helperText={errors.price?.message}
            sx={styleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
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
            {imgList?.map((image, index) => {
              console.log('image', image)
              if(image !== '')
                return (
                  <Box sx={{position: 'relative', cursor: 'pointer' }} >
                    <img key={uuidv4()} src={'http://' + image.url} style={{ ...styleImage, objectFit: 'contain' }} />
                    <IconButton 
                      aria-label="delete"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        opacity: '1',
                        bgcolor: '#fff',
                        width: '18px',
                        height: '18px',
                        mt: '2px',
                        mr: '2px',
                        border: '1px solid #bdbdbd',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        '&:hover': {
                          bgcolor: 'grey.300'
                        }
                      }}
                      onClick={() => handleDeteleImage(index)}
                      >
                      <ClearIcon sx={{ color: '#424242', fontSize: '14px'}}/>
                    </IconButton>
                  </Box>
                )
              else 
                return null
            })}
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <input type='file' id='file' onChange={handleImage}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}}>
              <Button variant="outlined" onClick={handleUpload}>Upload</Button>
              <Button variant="contained" type='submit'>Create</Button>
            </Box>
          </Box>
        </Box>
      </form>
      <AlertNotification />
    </>
    
  )
}

export default CreateProductForm