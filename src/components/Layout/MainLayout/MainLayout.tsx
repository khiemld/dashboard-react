import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkExpire } from '~/helper/checkExpireToken'
import AppBar from '~/pages/Admin/Components/Common/AppBar/AppBar'
import Sidebar from '~/pages/Admin/Components/Common/Sidebar/Sidebar'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Dialog } from '@mui/material'

function MainLayout() {
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseOpenDialog = () => {
    setOpenDialog(false)
  }

  const navigate = useNavigate()
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const tokenLocal = localStorage.getItem('accessToken')
    if(tokenLocal) {
      const isExpire = checkExpire(tokenLocal)
      if (isExpire) {
        setOpenDialog(true)
        sessionStorage.removeItem('accessToken')
      }
    }
    else if (token) {
      const isExpire = checkExpire(token)
      if (isExpire) {
        setOpenDialog(true)
        sessionStorage.removeItem('accessToken')
      }
    }
    else {
      navigate('/login')
    }
  }, [ checkExpire ])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <Sidebar />
      <Outlet />
      <Dialog
        open = {openDialog}
        onClose={handleCloseOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Expire Session'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your session has expired please log in again to continue using the app!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOpenDialog}>Disagree</Button>
          <Button onClick={() => {
            // sessionStorage.removeItem('accessToken')
            navigate('/login')
          }} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MainLayout
