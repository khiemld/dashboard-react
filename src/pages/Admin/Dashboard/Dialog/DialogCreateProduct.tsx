import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateProductForm from '../HandleForm/CreateProductForm'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import { create } from 'zustand'
import { resetSate } from '../../../../redux/reducers/uploadSlice/uploadSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'

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

export const openDialogCreate = (onOpen: () => void) => {
  useDialogStore.setState({
    onOpen
  })
}

export const closeDialogCreate = () => {
  useDialogStore.setState({
    onOpen: undefined
  })
}

export default function DialogCreateProduct() {
  const {onOpen, onClose} = useDialogStore()

  const handleOpen = () => {}

  const handleOpenDialog = () => {
    openDialogCreate(handleOpen)
  }
  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    dispatch(resetSate)
  })
  
  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Create Product
      </Button>

      <Dialog open={Boolean(onOpen)} onClose={onClose} sx={{
        '.MuiPaper-root' : {
          minWidth: '600px'
        }
      }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
          <DialogTitle color='primary.main'>Create Product</DialogTitle>
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
          <CreateProductForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
}