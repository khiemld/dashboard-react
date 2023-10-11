import { Snackbar } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { create } from 'zustand'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

type AlertStore = {
  message: string,
  severity: severityType
  onOpen?: () => void
  onClose: () => void
}

const useAlertStore = create<AlertStore>((set) => ({
  message: '',
  severity: 'error',
  onOpen: undefined,
  onClose: () => set({
    onOpen: undefined
  })
}))

export const  openAlert = (message: string, severity: severityType, onOpen: () => void) => {
  useAlertStore.setState({
    message,
    severity,
    onOpen
  })
}

export const closeAlert = () => {
  useAlertStore.setState({
    onOpen: undefined
  })
}


export type severityType = 'error' | 'warning' | 'info' | 'success'

function AlertNotification() {
  const {onOpen, onClose, message, severity} = useAlertStore()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
  }


  return (
    <Snackbar open={Boolean(onOpen)} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
  )
}

export default AlertNotification