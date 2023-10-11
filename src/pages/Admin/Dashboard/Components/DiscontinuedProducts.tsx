import React, { useEffect, useRef } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CategoryIcon from '@mui/icons-material/Category'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/redux/store';
import { InitialState, Params } from '~/redux/reducers/adminSlice/type'
import { getAllProduct } from '~/redux/reducers/adminSlice/adminSlice';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '~/redux/axiosInstance';
import { ProductSelector } from '~/redux/selectors/selectors';

const usePrevious = <T extends number>(value: T): T | undefined => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function DiscontinuedProducts() {

  const [stoppedProduct, setStoppedProduct] = React.useState<number>(0)
  const dispatch = useDispatch<AppDispatch>()
  
  let preStoppedProduct = usePrevious(stoppedProduct)
  console.log('preStoppedProduct', preStoppedProduct)

  useEffect(() => {
    dispatch(getAllProduct({
      searchTerm: '',
      page: '',
      sortBy: '',
      sortType: '',
      active: false
    }))
      .then(function (data: PayloadAction<any, string, {
      arg: Params
      requestId: string
      requestStatus: string
      }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          setStoppedProduct(data.payload.pagination.totalItem)
          console.log('first product', data.payload.pagination.totalItem)
        }
      })
  }, [])

 

  useEffect(() => {
    if(preStoppedProduct === stoppedProduct) {
      dispatch(getAllProduct({
        searchTerm: '',
        page: '',
        sortBy: '',
        sortType: '',
        active: false
      }))
        .then(function (data: PayloadAction<any, string, {
        arg: Params
        requestId: string
        requestStatus: string
        }>) {
          if (data.meta.requestStatus === 'fulfilled') {
            setStoppedProduct(data.payload.pagination.totalItem)
            console.log('update product', data.payload.pagination.totalItem)
          }
        })
    }
   
  }, [stoppedProduct, preStoppedProduct])





  // useEffect(() => {
  //   let isMounted = true
  //   const nowProduct = stoppedProduct
  //   console.log('nowProduct', nowProduct)
  //   // if(nowProduct !== preStoppedProduct) {
  //     dispatch(getAllProduct({
  //       searchTerm: '',
  //       page: '',
  //       sortBy: '',
  //       sortType: '',
  //       active: false
  //     }))
  //       .then(function (data: PayloadAction<any, string, {
  //       arg: Params
  //       requestId: string
  //       requestStatus: string
  //       }>) {
  //         if (data.meta.requestStatus === 'fulfilled') {
  //           setStoppedProduct(data.payload.pagination.totalItem)
  //           console.log('product', stoppedProduct)
  //         }
  //       })
  //   // }
  //   return () => {
  //     isMounted = false
  //   }   
  // }, [stoppedProduct])

  return (
    <Card sx={{
      width: '100%',
      minWidth: 'fit-content',
      height: 'fit-content',
      minHeight: '185px',
      backgroundColor: 'white',
      ml: 1
    }}>
       <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', gap: 2}}>
        <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1}}>
          <Typography sx={{ fontSize: '18px', fontWeight: '400', color: 'grey.500' }} color="text.secondary" gutterBottom>
          Discontinued  Sales
          </Typography>
          <Box sx={{backgroundColor: '#e3f2fd', borderRadius: '5px'}}>
            <IconButton aria-label="delete" disabled color="primary" >
              <CategoryIcon sx={{fontSize: '32px', color: 'primary.main'}}/>
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{fontSize: '24px', fontWeight: '700', color: 'grey.700'}}>
          {stoppedProduct}
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5, color: '#f57c00'}}>
            <ArrowDownwardIcon sx={{ fontSize: '18px'}}/>
            <Typography variant="subtitle2">3.33%</Typography> 
          </Box>
          <Typography variant="subtitle2" sx={{fontWeight: '400', color: 'grey.500'}}>Since last month</Typography> 
        </Box>
      </CardContent>
    </Card>
  )
}

export default DiscontinuedProducts
