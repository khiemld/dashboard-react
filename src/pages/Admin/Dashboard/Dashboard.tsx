
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ProductTable from './ProducTable/ProductTable'
import TradedProducts from './Components/TradedProducts'
import DiscontinuedProducts from './Components/DiscontinuedProducts'
import LatestProduct from './Components/LatestProduct'
// import { ReactComponent as Logo } from ''


const drawerWidth: number = 240

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={{ p: 1, width: { sm: `calc(100% - ${drawerWidth}px)`}}}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container sx={{ mb: 4 }} justifyContent='space-around' direction="row" alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
          <Grid item md={3} xs = {4} sm={4}>
            <TradedProducts />
          </Grid>
          <Grid item md={3} xs = {4} sm={4}>
            <DiscontinuedProducts />
          </Grid>
          <Grid item md={6} xs = {4} sm={8}>
            <LatestProduct />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ProductTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}