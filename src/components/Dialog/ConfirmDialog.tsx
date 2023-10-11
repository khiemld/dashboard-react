import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { create } from 'zustand'

type ConfirmStore = {
  title: string,
  content: string,
  onOpen?: () => void,
  onClose: () => void
}

const useConfirmStore = create<ConfirmStore>((set) => ({
  title: '',
  content: '',
  onOpen: undefined,
  onClose: () => set({
    onOpen: undefined
  })
}))

export const openAlertConfirm = (title: string, content: string, onOpen: () => void) => {
  useConfirmStore.setState({
    title,
    content,
    onOpen
  })
}

export default function ConfirmDialog() {
  const { title, content, onOpen, onClose } = useConfirmStore()

  return (
    <div>
      <Dialog
        open={Boolean(onOpen)}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={
            () => {
              if (onOpen) {
                onOpen()
              }
              onClose()
            }
          } autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
