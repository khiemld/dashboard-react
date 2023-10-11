import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Product } from '../../../../redux/reducers/adminSlice/type'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import { create } from 'zustand'
import DetailProductForm from '../HandleForm/DetailProductForm'


type DialogStore = {
  onOpen?: () => void,
  onClose: () => void
}


const useDialogStore = create<DialogStore>((set) => ({
  onOpen : undefined,
  onClose: () => set({
    onOpen: undefined
  })
}))

export const openDialogDetail = (onOpen: () => void) => {
  useDialogStore.setState({
    onOpen
  })
} 

export const closeDialogDetail = () => {
  useDialogStore.setState({
    onOpen: undefined
  })
}

type DialogDetailProps = {
  productDetail: Product
}


export default function DialogDetailProduct({ productDetail } : DialogDetailProps) {
  const {onOpen, onClose} = useDialogStore()
  return (
    <div>
      <Dialog open={Boolean(onOpen)} sx={{
        '.MuiPaper-root' : {
          minWidth: '600px'
        }
      }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
          <DialogTitle color='primary.main'>Detail Product</DialogTitle>
          <DialogActions>
            <CloseIcon onClick={onClose} sx={{
              color: 'grey.500',
              '&:hover' : {
                backgroundColor: 'grey.200',
                cursor: 'pointer',
                borderRadius: '50%'
              }
            }}/>
          </DialogActions>
        </Box>
        <DialogContent>
          <DetailProductForm productDetail={productDetail}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}