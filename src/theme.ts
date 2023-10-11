import { experimental_extendTheme as extendTheme} from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  // reactProject: {
  // },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3887FF',
          light: '#C7F3FF',
          dark: '#006BDE'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fafafa',
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bdbdbd'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root:{ 
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.875rem',
          '& fieldset':{ borderWidth: '0.5px !important' }, //Don't emphasize border when type on input
          '&:hover fieldset':{ borderWidth: '2px !important' }, //Don't emphasize border when type on input
          '&:Mui-focused fieldset':{ borderWidth: '2px !important' } //Don't emphasize border when type on input
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&$selected': {
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: 'orange',
            }
          }
        }
        // button: {
        //   '&:hover': {
        //     backgroundColor: 'yellow',
        //   },
        // }
      }
    }

  }
  // ...other properties
})
export default theme
