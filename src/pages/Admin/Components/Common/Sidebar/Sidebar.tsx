import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'

const drawerWidth: number = 240

const styteSelect = {
  '&.Mui-selected': {
    width: drawerWidth,
    borderRadius: '5px',
    backgroundColor: '#37474f',
    '&.Mui-selected:hover': {
      backgroundColor: '#455a64'
    },
    '.MuiListItemText-root': {
      color: 'white'
    },
    '.MuiListItemIcon-root': {
      color: 'white'
    }
  }
}

const mainList = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon/>,
    path: '/'
  },
  {
    text: 'Orders',
    icon: <ShoppingCartIcon />,
    path: '/orders'
  },
  {
    text: 'Customers',
    icon: <PeopleIcon />,
    path: '/customers'
  },
  {
    text: 'Reports',
    icon: <BarChartIcon />,
    path: '/reports'
  },
  {
    text: 'Integrations',
    icon: <LayersIcon />,
    path: '/integrations'
  }

]

const subList = [
  {
    text: 'Current month',
    path: '/current-month'
  },
  {
    text: 'Last quarter',
    path: '/last-quarter'
  },
  {
    text: 'Year-end sale',
    path: '/year-end-sale'
  }
]

const drawer = (path : string) => (
  <Box >
    <Box sx={{width: '100%', display: 'flex', height: '64px', justifyContent: 'center', alignItems:'center', gap:1}}>
      {/* <SvgIcon component={Logo} inheritViewBox fontSize='large'/> */}
      <Typography variant='h5' fontWeight='800' color='white'>eMark</Typography>
    </Box>
    <Divider />
    <List >
      {mainList.map((item, index) => {
        const { text, icon} = item
        return (
          <ListItem
            key={index}
            component ={Link}
            to = {item.path}
            sx={{
              '&:hover': { color: 'primary.light' }
            }}
          >
            <ListItemButton
              selected={path === item.path ? true : false}
              sx={styteSelect}
            >
              {icon && <ListItemIcon sx={{ color: '#b0bec5', display: 'flex', justifyContent: 'center' }} >{icon}</ListItemIcon>}
              <ListItemText primary={text} sx={{ color: '#b0bec5' }}/>
            </ListItemButton >
          </ListItem>
        )
      })}
    </List>
    <Divider />
    <List >
      <ListSubheader component="div" inset sx={{backgroundColor: '#263238', color: '#eceff1'}} >
        SAVE REPORTS
      </ListSubheader>
      {
        subList.map((item, index) => (
          <ListItem
            key={index}
            component ={Link}
            to = {item.path}
            sx={{
              '&:hover': { color: 'primary.light' }
            }}
          >
            <ListItemButton
              selected={path === item.path ? true : false}
              sx={styteSelect}
            >
              <ListItemIcon sx={{ color: '#b0bec5', display: 'flex', justifyContent: 'center' }} ><AssignmentIcon /></ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#b0bec5' }}/>
            </ListItemButton >
          </ListItem>
        ))}
    </List>
  </Box>
)

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function Sidebar(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { window } = props
  const container = window !== undefined ? () => window().document.body : undefined
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const location = useLocation()
  const path = location.pathname

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        height: '100%'
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          backgroundColor: '#212121',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263238' },
        }}
      >
        {drawer(path)}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#263238' }
        }}
        open
      >
        {drawer(path)}
      </Drawer>
    </Box>
  )
}

export default Sidebar