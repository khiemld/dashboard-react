import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import SignInForm from './HandleForm/SignIn/SignInForm'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/reducers/accountSlice/accountSlice'
import { AppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import LoginCover from '../../../src/assets/cover/LoginCover.jpg'

function Login() {
  // const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(logOut)
    sessionStorage.removeItem('accessToken')
  }, [])

  return (
    <Box sx= {{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      overflow: 'hidden',
      height: '100vh'
    }}>
      <Box width={{xs: 'fit-content', sm: 'fit-content', md: '70%'}} sx={{
        display: 'flex',
        height: '80vh',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        backgroundColor: 'white',
        borderRadius: '20px'
      }}>
        <Box width = {{ md: '50%'}} display={{xs: 'none', sm: 'none', md: 'block'}} sx={{
          backgroundImage: `url(${LoginCover})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </Box>
        <Box width={{xs: 'fit-content', sm: 'fit-content', md: '70%'}} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}>
          <Box width={{ sm: '70%',md: '100%'}} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: 'fit-content',
          }}>
            <Typography  fontWeight='medium' fontSize='1.8rem'>WELCOME BACK!</Typography>
            <Typography  variant='subtitle1' fontWeight='400' sx={{color: 'grey.500'}}>Start managing your product faster and better</Typography>
          </Box>
          <SignInForm/>

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant='subtitle1' fontSize='14px' sx={{ display: 'inline' , width: 'fit-content'}}>Don't you have an account?</Typography>
            <Link to='/register' style={{fontSize: '14px', color: '#3887FF', marginLeft: '6px'}}>Sign Up</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login