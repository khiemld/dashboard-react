import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Box from '@mui/system/Box'
import { UserLogin } from '../../../../redux/reducers/accountSlice/type'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Checkbox from '@mui/material/Checkbox'
import { Link, useNavigate } from 'react-router-dom'
import { loginRequest } from '../../../../redux/reducers/accountSlice/accountSlice'
import store, { AppDispatch } from '../../../../redux/store'
import { useDispatch } from 'react-redux'
import FormControlLabel from '@mui/material/FormControlLabel'
import {  saveTokenInLocalStorage, saveTokenInSessionStorage } from '../../../../service/authService'
import { PayloadAction } from '@reduxjs/toolkit'
import FormInputText from '../../../../components/FormComponent/FormInputText'
import AlertNotification, { closeAlert, openAlert } from '../../../../components/Dialog/AlertNotification'
import axios from 'axios'

const styleInput = {
  width: '100%',
  maxWidth: '350px',
  '.MuiFormHelperText-root' : {
    color: 'red'
  }
}


function SignInForm() {
  const [checkRemember, setCheckRemember] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>()


  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
  }

  //=======================Remember login===================================
  const handleCheckBox = () => {
    setCheckRemember(!checkRemember)
  }

  //===================Using yup to validation==============================
  const schema = yup
    .object({
      username: yup.string().required('Please enter username').min(10, 'Your username must be at least 10 characters long'),
      password: yup.string().required('Please enter password')
        .min(10, 'Your password must be at least 10 characters long')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(|(?=.*_))^[^ ]+$/, 'Password must contain uppercase, lowercase letters and digits'),
    })
    .required()
  //=================Using react hook form================================
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const { errors, touchedFields } = formState

  // const hasErrorUsername = (touchedFields.username || touchedFields.password ) && (errors['username'] || errors['password'])
  const hasErrorUsername = touchedFields.username && errors['username']
  const hasErrorPassword = touchedFields.password && errors['password']

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  //====================================HANDLE SUBMIT====================================
  async function handleSignInSubmit ( values : UserLogin ) {
    const userLogin : UserLogin = {
      username : values.username,
      password: values.password
    }

    if(!checkRemember) {
      localStorage.removeItem('accessToken')
    }

    dispatch(loginRequest(userLogin)).then(function (data: PayloadAction<any, string, {
      arg: UserLogin
      requestId: string
      requestStatus: string
      }>) {
      if (data.meta.requestStatus === 'fulfilled') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.payload}`
        saveTokenInSessionStorage(data.payload)
        if (checkRemember) {
          saveTokenInLocalStorage(data.payload)
        }
        navigate('/')
      }
      else if (data.meta.requestStatus === 'rejected') {
        openAlert('Login Failed', 'error', () => {})
        setTimeout(() => {
          closeAlert()
        }, 1000)
      }
    })
  }

 

  return (
    <form onSubmit={handleSubmit(handleSignInSubmit)}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1.5,
        p: 2
      }}>
        <FormInputText
          name='username'
          control={control}
          placeholder='Username'
          error={!!hasErrorUsername}
          helperText={errors.username?.message}
          sx={styleInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormInputText
          name='password'
          control={control}
          placeholder='Password'
          error={!!hasErrorPassword}
          helperText={errors.password?.message}
          sx={styleInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          type= {showPassword ? 'text' : 'password'}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '350px'}}>
          <FormControlLabel 
            control={<Checkbox checked ={checkRemember} onChange={handleCheckBox}/>} 
            label="Remember me" 
            sx={{ 
              '.MuiTypography-root':{
                fontSize: '14px'
              },
              '.MuiCheckbox-root':{
                padding: '6px',
                margin: '0'
              }
            }} />

          <Link to='/forgotPassword'  style={{fontSize: '14px', color: '#3887FF'}}>Forgot password?</Link>
        </Box>
        <AlertNotification />
        <Button  variant="contained" type='submit' >
          Login
        </Button>
      </Box>
    </form>
  )
}

export default SignInForm