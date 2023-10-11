import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Profile from '../Sidebar/Component/Profile/Profile'
import { useLocation } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth: number = 240

const AppBarComponent = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  })
}))

function AppBar() {
  let appBarName = ''
  const location = useLocation()
  const path = location.pathname


  if (path === '/')
    appBarName = 'Dashboard'
  else if (path.includes('/orders'))
    appBarName = 'Orders'
  else if (path === '/customers')
    appBarName = 'Customers'
  else if (path === '/reports')
    appBarName = 'Reports'
  else if (path === '/integrations')
    appBarName = 'Integrations'
  else if (path === '/current-month')
    appBarName = 'Save Reports | Current month'
  else if (path === '/last-quarter')
    appBarName = 'Save Reports | Last quarter'
  else if (path === '/year-end-sale')
    appBarName = 'Save Reports | Year-end sale'

  return (
    <AppBarComponent
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #bdbdbd'
      }}
    >
      <Box sx={{width: '100%', display: 'flex', height: '64px', justifyContent: 'space-between', alignItems:'center', p: 4}}>
        <Typography variant="h6" noWrap component="div" color='grey.600'>
          {appBarName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <Badge color="primary" variant="dot" >
              <NotificationsOutlinedIcon sx={{
                color: 'grey.700',
                fontSize: '24px'
              }}/>
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ color: 'grey.700' }} />
          </Tooltip>
          <Profile />
        </Box>
        
      </Box>
    </AppBarComponent>
  )
}

export default AppBar
