import React, {useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Box from '@mui/system/Box'
import { AuthenticatedUser } from '../../../../redux/reducers/accountSlice/type'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import {  registerRequest } from '../../../../redux/reducers/accountSlice/accountSlice'
import { AppDispatch } from '../../../../redux/store'
import { useDispatch } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import { PayloadAction } from '@reduxjs/toolkit'
import FormInputText from '../../../../components/FormComponent/FormInputText'
import AlertNotification, { closeAlert, openAlert } from '../../../../components/Dialog/AlertNotification'



const styleInput = {
  width: '100%',
  minWidth: '350px',
  maxWidth: '350px',
  '.MuiFormHelperText-root' : {
    color: 'red'
  }
}


function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>()

  const handleClickConfirmPassword = () => setShowConfirmPassword((show) => !show)


  //===================Using yup to validation==============================
  const schema = yup
    .object({
      username: yup.string().required('Please enter username').min(10, 'Username must be at least 10 characters long'),
      password: yup.string().required('Please enter password')
        .min(10, 'Your password must be at least 10 characters long')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(|(?=.*_))^[^ ]+$/, 'Password must contain uppercase, lowercase letters and digits'),
      fullname: yup.string().required('Please enter fullname').matches(/^[a-zA-Z ]{2,30}$/, 'Name must contain only letter'),
      email: yup.string().required('Please enter email').matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email'),
      confirmPassword: yup.string().label('Confirm password').required().oneOf([yup.ref('password'), ''], 'Passwords must match')
    })
    .required()
  
  //=================Using react hook form================================
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: '',
      password: '',
      fullname: '',
      email: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const { errors, touchedFields } = formState
  // const hasError = (touchedFields.username || touchedFields.password || touchedFields.confirmPassword || touchedFields.fullname || touchedFields.email) 
  // && (errors['username'] || errors['password'] || errors['fullname'] || errors['email'] || errors['confirmPassword'])
  const hasErrorUsername = touchedFields.username && errors['username']
  const hasErrorPassword = touchedFields.password && errors['password']
  const hasErrorFullname = touchedFields.fullname && errors['fullname']
  const hasErrorEmail = touchedFields.email && errors['email']
  const hasErrorConfirm = touchedFields.confirmPassword && errors['confirmPassword']

  const dispatch = useDispatch<AppDispatch>()
  // const stateAccount = useSelector<RootState, InitialState>((state) => state.accountRequest)
  const navigate = useNavigate()
  
  const handleSignUpSubmit : SubmitHandler<AuthenticatedUser> = ( values ) => {
    const userRegister : AuthenticatedUser = {
      username : values.username,
      fullname: values.fullname,
      password: values.password,
      email: values.email
    }

    dispatch(registerRequest(userRegister)).then(function (data: PayloadAction<any, string, {
      arg: AuthenticatedUser
      requestId: string
      requestStatus: string
      }>) {
      if (data.meta.requestStatus === 'fulfilled') {
        openAlert('Register Successfully', 'success', () => {})
        setTimeout(() => closeAlert(), 1000)
        navigate('/login')
      }
      else if (data.meta.requestStatus === 'rejected') 
      {
        openAlert('Register Failed', 'error', () => {})
        setTimeout(() => {
          closeAlert()
        }, 1000)
      }
    })
  }
  
  return (
    <form onSubmit={handleSubmit(handleSignUpSubmit)}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1.5,
        p: 2
      }}>
        <FormInputText
          name = 'fullname'
          control = {control}
          placeholder='Fullname'
          error = {!!hasErrorFullname}
          helperText={errors.fullname?.message}
          sx={styleInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
        />
        <FormInputText 
          name = 'email'
          control = {control}
          placeholder='Email'
          error = {!!hasErrorEmail}
          helperText={errors.email?.message}
          sx={styleInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />
        <FormInputText 
          name = 'username'
          control = {control}
          placeholder='Username'
          error = {!!hasErrorUsername}
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
          name = 'password'
          control = {control}
          placeholder='Password'
          error = {!!hasErrorPassword}
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
        <FormInputText
          name = 'confirmPassword'
          type = {showConfirmPassword ? 'text' : 'password'}
          control = {control}
          placeholder='Confirm password'
          error = {!!hasErrorConfirm}
          helperText={errors.confirmPassword?.message}
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
                  onClick={handleClickConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{display : 'flex', justifyContent: 'center', alignItems: 'center', gap: 1}}>
          <Button  variant="outlined" type='submit' color='warning' onClick={() => navigate('/login')} sx={{width: '40%'}}>Cancel</Button>
          <Button  variant="contained" type='submit' sx={{width: '40%'}}>Register</Button>
        </Box>
       
      </Box>
      <AlertNotification />
    </form>
  )
}

export default SignUpForm
