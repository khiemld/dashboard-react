import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CategoryIcon from '@mui/icons-material/Category'
import { useDispatch } from 'react-redux'
import { Params } from 'react-router-dom'
import { PayloadAction } from '@reduxjs/toolkit'
import { getAllProduct } from '~/redux/reducers/adminSlice/adminSlice'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

function TradedProducts() {
  const [tradedProducts, setTradedProduct] = React.useState<number>(0)
  
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllProduct({
      searchTerm: '',
      page: '',
      sortBy: '',
      sortType: '',
      active: true
    }))
      .then(function (data: PayloadAction<any, string, {
      arg: Params
      requestId: string
      requestStatus: string
      }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          setTradedProduct(data.payload.pagination.totalItem)
        }
      })
  }, [])

  return (
    <Card sx={{
      width: '100%',
      minWidth: 'fit-content',
      height: 'fit-content',
      minHeight: '185px',
      backgroundColor: 'white'
    }}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', gap: 2,  }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <Typography sx={{ fontSize: '18px', fontWeight: '400', color: 'grey.500' }} color="text.secondary" gutterBottom>
            Traded Products
          </Typography>
          <Box sx={{backgroundColor: '#e3f2fd', borderRadius: '5px'}}>
            <IconButton aria-label="delete" disabled color="primary" >
              <CategoryIcon sx={{fontSize: '32px', color: 'primary.main'}}/>
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{fontSize: '24px', fontWeight: '700', color: 'grey.700'}}>
          {tradedProducts}
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5, color: '#4caf50'}}>
            <ArrowUpwardIcon sx={{ fontSize: '18px'}}/>
            <Typography variant="subtitle2">5.27%</Typography> 
          </Box>
          <Typography variant="subtitle2" sx={{fontWeight: '400', color: 'grey.500'}}>Since last month</Typography> 
        </Box>
      </CardContent>
    </Card>
  )
}

export default TradedProducts