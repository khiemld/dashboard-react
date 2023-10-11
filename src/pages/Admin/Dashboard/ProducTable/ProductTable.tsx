import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../../../redux/reducers/adminSlice/adminSlice'
import { AppDispatch, RootState } from '../../../../redux/store'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Checkbox, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import MoreOption from './Components/MoreOption'
import { Box } from '@mui/system'
import { ActiveType, InitialState, Params, Product, SortType } from '../../../../redux/reducers/adminSlice/type'
import { InitialState as InitialDetail } from '../../../../redux/reducers/productSlice/type'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import ActiveOptions from './Components/ActiveOption'
import { FormatDateString } from '../../../../helper/FormatString'
import TableRowsIcon from '@mui/icons-material/TableRows'
import SearchIcon from '@mui/icons-material/Search'
import DialogCreateProduct from '../Dialog/DialogCreateProduct'
import DialogDetailProduct, { openDialogDetail } from '../Dialog/DialogDetailProduct'
import { deleteProduct, getProduct } from '../../../../redux/reducers/productSlice/productSlice'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import Toolbar from '@mui/material/Toolbar'
import { CSVLink } from 'react-csv'
import DownloadIcon from '@mui/icons-material/Download'
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton'
import { PayloadAction } from '@reduxjs/toolkit'
import AlertNotification, { closeAlert, openAlert } from '~/components/Dialog/AlertNotification'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ConfirmDialog, { openAlertConfirm } from '~/components/Dialog/ConfirmDialog'

const usePrevious = <T extends Params>(value: T): T | undefined => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const commonStyle = {
  color: 'grey.600',
  fontSize: '18px'
}


export default function ProductTable() {
  const productState = useSelector<RootState, InitialState>((state) => state.productRequest)
  const productList = productState.items
  const pagination = productState.pagination
  const dispatch = useDispatch<AppDispatch>()
  //============ManageState===========
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  

  const isSelected = (product: Product) => selected.indexOf(product) !== -1

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }


  const [searchProduct, setSearchProduct] = useState<string>('')
  const [nameProduct, setNameProduct] = useState<string>('')
  const [orderBy, setOrderBy] = useState<string>('')
  const [sortType, setSortType] = useState<SortType>('')
  const [activeType, setActiveType] = useState<ActiveType>('')
  const [paramState, setParamState] = useState<Params>({
    searchTerm: nameProduct,
    page: page.toString(),
    sortBy: orderBy,
    sortType: sortType,
    active: activeType
  })
  const preParam = usePrevious(paramState)

  const [idProduct, setIdProduct] = useState<number>(0)

  useEffect(() => {
    setSelected([])
    dispatch(getAllProduct(paramState))
      .then(function (data: PayloadAction<any, string, {
      arg: Params
      requestId: string
      requestStatus: string
      }>) {
        if (data.meta.requestStatus === 'fulfilled') {
          setLoading(false)
          setParamState(
            {
              searchTerm: nameProduct,
              page: page.toString(),
              sortBy: orderBy,
              sortType: sortType,
              active: activeType
            }
          )
        }
        else if (data.meta.requestStatus === 'pending') {
          setLoading(true)
        }
      })

  }, [])

  useEffect(() => {
    let isMounted = true
    const newParam : Params = {
      searchTerm: nameProduct,
      page: page.toString(),
      sortBy: orderBy,
      sortType: sortType,
      active: activeType
    }
    if (newParam !== preParam) {
      dispatch(getAllProduct(newParam))
        .then(function (data: PayloadAction<any, string, {
        arg: Params
        requestId: string
        requestStatus: string
        }>) {
          if (data.meta.requestStatus === 'fulfilled') {
            if (isMounted) {
              setParamState(
                newParam
              )
              setLoading(false)
            }
          }
          else if (data.meta.requestStatus === 'pending') {
            setLoading(true)
          }
        })
    }
    return () => {
      isMounted = false
    }

  }, [nameProduct, page, orderBy, sortType, activeType])

  const handleSort = (orderBy: string, sortType : SortType) => {
    setPage(1)
    setOrderBy(orderBy)
    setSortType(sortType)
  }

  const handleSortActive = (activeType : ActiveType) => {
    setActiveType(activeType)
    setPage(1)
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setPage(1),
    setSearchProduct(e.target.value.trim())
    if(e.target.value.trim() === '') {
      setNameProduct('')
      return
    }
  }

  const handleOpen = () => {}

  function handleDetail(idProduct : number) {
    setIdProduct(idProduct)
    openDialogDetail(handleOpen)
    dispatch(getProduct(idProduct))
  }

  const handleDelete = (idProduct: number) => {
    openAlertConfirm('Confirm Delete', 'Are you sure to delete this product', () => {
      if(idProduct) {
        dispatch(deleteProduct(idProduct))
          .then(function (data: PayloadAction<any, string, {
          arg: number
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
              openAlert('Delete Successful', 'success', () => {})
              setTimeout(() => {
                closeAlert()
              }, 1000)
            }
            else if (data.meta.requestStatus === 'rejected') {
              openAlert('Delete Failed', 'error', () => {})
              setTimeout(() => {
                closeAlert()
              }, 1000)
            }
          })
      }
    })
  }

  const productDetail = useSelector<RootState, InitialDetail>((state) => state.productItemRequest).product

  useEffect(() => {
    dispatch(getProduct(idProduct))
  }, [ idProduct ])

  const handleSelect = (event: React.MouseEvent<unknown>, name: Product) => {
    const selectedIndex = selected.indexOf(name);
    console.log(selectedIndex)
    let newSelected:Product[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const headers= [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price' },
    { label: 'Description', key: 'description' },
    { label: 'Active', key: 'active' },
    { label: 'Created At', key: 'createdAt' },
    { label: 'Updated At', key: 'updatedAt' },
    { label: 'Product Images', key: 'ProductImage' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'maxHeight', '&.MuiToolbar-root' : {padding: 0}}}>
        {
          selected.length > 0 ?
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <Typography variant='h5' fontWeight='500' fontSize='16px' sx={{ opacity: '0.7', ml: '8px' }} >{selected.length} selected</Typography>
              <Tooltip title="Clear all selected rows">
                <Chip
                  icon={<IndeterminateCheckBoxIcon/>} 
                  label="Clear"
                  clickable
                  sx={{
                    color: '#ff9100',
                    bgcolor: '#fff3e0',
                    border: 'none',
                    paddingX: '5px',
                    borderRadius: '4px',
                    '.MuiSvgIcon-root': {
                      color: '#ff9100'
                    },
                    '&:hover': {
                      bgcolor: '#ffe0b2'
                    }
                  }}
                  onClick={() => setSelected([])}
                />
              </Tooltip>
              <CSVLink data={selected} headers={headers} filename={'product_detail.csv'} target='_blank' style={{textDecoration: 'none', color: '#3887FF'}}>
                <Tooltip title="Export to CSV file">
                  <Chip
                    icon={<DownloadIcon sx={{color: 'warning'}}/>} 
                    label="Export" 
                    clickable 
                    sx={{
                      color: 'primary.main',
                      bgcolor: '#e1f5fe',
                      border: 'none',
                      paddingX: '5px',
                      borderRadius: '4px',
                      '.MuiSvgIcon-root': {
                        color: 'primary.main'
                      },
                      '&:hover': {
                        bgcolor: '#b3e5fc'
                      }
                    }}/>
                </Tooltip>
              </CSVLink>
            </Box>
            :
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <TableRowsIcon sx={{ color: 'primary.main' }} />
                <Typography variant='h5' fontWeight='500' color='primary.main' sx={{ opacity: '0.9' }}>Product</Typography>
              </Box>
            </>
        }
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField sx={{
            mr: 2,
            '.MuiOutlinedInput-input': {
              height: '7px'
            }
          }}
          placeholder='Search product...'
          value={searchProduct}
          onChange = {handleSearch}
          onKeyDown = {e => e.key === 'Enter' ? setNameProduct(searchProduct) : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          />
        </Box>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, width: '72vw' }}>
          <Table stickyHeader aria-label="sticky table" >
            {/**========================================================Table Head=========================================*/}
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                <TableCell align="left" >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', gap: 1}}>
                      <Typography variant='subtitle2' sx={{ width: '90%', textAlign: 'left' }}>Name</Typography> 
                      {sortType === 'asc' && orderBy === 'name' ? <NorthIcon sx={commonStyle} /> : null}
                      {sortType === 'desc' && orderBy === 'name' ? <SouthIcon sx={commonStyle} /> : null}
                    </Box>
                    <MoreOption name='name' handleSort={handleSort}/>
                  </Box>
                </TableCell>
                <TableCell align="left" >
                  Decription
                </TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} >
                    <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', gap: 1}}>
                      <Typography variant='subtitle2' sx={{ width: '90%', textAlign: 'center' }}>Price&nbsp;($)</Typography> 
                      {sortType === 'asc' && orderBy === 'price' ? <NorthIcon sx={commonStyle} /> : null}
                      {sortType === 'desc' && orderBy === 'price' ? <SouthIcon sx={commonStyle} /> : null}
                    </Box>
                    <MoreOption name='price' handleSort={handleSort}/>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} >
                    <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', gap: 1}} >
                      <Typography variant='subtitle2' sx={{ width: '90%', textAlign: 'center' }}>Active</Typography>
                      {activeType === true ? <CheckBoxIcon sx={commonStyle}/> : null}
                      {activeType === false ?<IndeterminateCheckBoxIcon sx={commonStyle}/>: null} 
                    </Box>
                    <ActiveOptions handleSortActive={handleSortActive}/>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',cursor: 'pointer'  }} >
                    <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', gap: 1}} >
                      <Typography variant='subtitle2' sx={{ width: '90%', textAlign: 'center' }}>Created At</Typography> 
                      {sortType === 'asc' && orderBy === 'createdAt' ? <NorthIcon sx={commonStyle} /> : null}
                      {sortType === 'desc' && orderBy === 'createdAt' ? <SouthIcon sx={commonStyle} /> : null}
                    </Box>
                    <MoreOption name='createdAt' handleSort={handleSort} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',cursor: 'pointer'  }} >
                    <Typography variant='subtitle2' sx={{ width: '90%', textAlign: 'center' }}>Action</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            {/**========================================================Table Body=========================================*/}
            {
              loading ?
                <TableBody>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover.MuiTableRow-root': {
                        backgroundColor: 'rgba(168,212,255, 0.4)',
                        cursor: 'pointer'
                      }
                    }}
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell padding="checkbox" onClick = {e => e.stopPropagation()}>
                      <Checkbox
                        color="primary"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: 6 }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="20vw"
                        style={{ marginBottom: 6 }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: 6 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: 6 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: 6 }}
                      />
                    </TableCell>
                    
                  </TableRow>
                </TableBody>
                :
                <TableBody>
                  {productList.map((row) =>
                  {
                    const isItemSelected = isSelected(row)
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover.MuiTableRow-root': {
                            backgroundColor: 'rgba(168,212,255, 0.4)'
                          }
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        tabIndex={-1}
                      >
                        <TableCell padding="checkbox" onClick = {e => e.stopPropagation()}>
                          <Checkbox
                            color="primary"
                            onClick = {e => handleSelect(e, row)}
                            checked={isItemSelected}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="left">{row.description.length > 100 ? row.description.substring(0, 99) + '...' : row.description }</TableCell>
                        <TableCell align="left">${row.price}</TableCell>
                        <TableCell align="center"> {row.active === true ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell align="center">{FormatDateString(row.createdAt)}</TableCell>
                        <TableCell align="center">
                          <Box sx={{display: 'flex', }}>
                            <IconButton size="small" aria-label="detail" onClick = {() => handleDetail(row.id)}>
                              <EditIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                            <IconButton aria-label="delete" size="small" onClick= { () => handleDelete(row.id)}>
                              <DeleteIcon sx={{fontSize: '20px' }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  }
                  )}
                </TableBody>
            }
          </Table>

        </TableContainer>
        <AlertNotification />
      </Paper>
      <Box flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <DialogCreateProduct />
        <Stack spacing={{ xs: 0, sm: 0, md: 2 }} sx={{ alignSelf: 'end' }}>
          <Pagination color="primary" count={pagination.limit} page={page} onChange={handleChange} />
        </Stack>
      </Box>
      {productDetail ? <DialogDetailProduct productDetail={productDetail} /> : null}
      <ConfirmDialog />
      
    </Box>

  )

}
