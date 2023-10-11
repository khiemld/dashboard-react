import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useDispatch  } from 'react-redux';
import { AppDispatch  } from '~/redux/store';
import {  Params, Product } from '~/redux/reducers/adminSlice/type';
import { getAllProduct } from '~/redux/reducers/adminSlice/adminSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import  { openDialogDetail } from '../Dialog/DialogDetailProduct';
import { getProduct } from '~/redux/reducers/productSlice/productSlice';
import FiberNewIcon from '@mui/icons-material/FiberNew';

function LatestProduct() {
  const [latestProduct, setLatestProduct] = React.useState<Product>(
    {
      id: 0,
      name: '',
      description: '',
      price: 0,
      active: true,
      createdAt: '',
      updatedAt: ''
    }
  )

  const [img, setImg] = React.useState<string>('')
  
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllProduct({
      searchTerm: '',
      page: '',
      sortBy: 'createdAt',
      sortType: 'desc',
      active: ''
    }))
      .then(function (data: PayloadAction<any, string, {
      arg: Params
      requestId: string
      requestStatus: string
      }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          setLatestProduct(data.payload.items[0])
          if(data.payload.items[0]?.ProductImage[0]?.url) {
            setImg(data.payload.items[0]?.ProductImage[0]?.url)
          }
        }
      })
  }, [])

  const handleDetail = (id: number) => {
    openDialogDetail(() => {})
    dispatch(getProduct(id))
  }

  return (
    <>
      <Card sx={{
        width: '100%',
        minWidth: 'fit-content',
        height: 'fit-content',
        minHeight: '180px',
        backgroundColor: 'white',
        ml: 1
      }}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', gap: 1}}>
          <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <Typography sx={{ fontSize: '18px', fontWeight: '400', color: 'grey.500' }} color="text.secondary" gutterBottom>
              Latest Product
            </Typography>
            <Box sx={{backgroundColor: '#e3f2fd', borderRadius: '5px'}}>
              <IconButton aria-label="delete" disabled color="primary" >
                <FiberNewIcon sx={{fontSize: '30px', color: 'primary.main'}}/>
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', gap: 1}}>
              <Typography variant="h5" component="div" sx={{fontSize: '18px', fontWeight: '500', color: 'grey.700'}}>
                {latestProduct?.name.length > 50 ? latestProduct?.name.substring(0, 49) + '...' : latestProduct?.name}
              </Typography>
              <Typography variant="subtitle2" component="div" sx={{fontSize: '16px', fontWeight: '500', color: 'grey.500'}}>
                Price: ${latestProduct?.price}
              </Typography>
              <Button variant='outlined' sx={{width: 'fit-content', padding: 0}} onClick = {() => handleDetail(latestProduct.id)}>Detail</Button>
            </Box>
           
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                borderRadius: '5px',
                border: '1px solid #40c4ff'
              }}
              src={'http://' + img}
            />
          </Box>
          
        </CardContent>
      </Card>
    </>
    
  )
}

export default LatestProduct
