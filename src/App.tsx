import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Account/Login'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Register from './pages/Account/Register'
import MainLayout from './components/Layout/MainLayout/MainLayout'
import Orders from './pages/Admin/Orders/Orders'
import Customers from './pages/Admin/Customers/Customers'
import Reports from './pages/Admin/Reports/Reports'
import Integrations from './pages/Admin/Integrations/Integrations'
import CurrentMonth from './pages/Admin/SaveReports/CurrentMonth/CurrentMonth'
import LastQuarter from './pages/Admin/SaveReports/LastQuarter/LastQuarter'
import YearEndSale from './pages/Admin/SaveReports/YearEndSale/YearEndSale'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Dashboard />}></Route>
          */}
          <Route index path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='customers' element={<Customers />}></Route>
            <Route path='reports' element={<Reports />}></Route>
            <Route path='integrations' element={<Integrations />}></Route>
            <Route path='current-month' element={<CurrentMonth />}></Route>
            <Route path='last-quarter' element={<LastQuarter />}></Route>
            <Route path='year-end-sale' element={<YearEndSale />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
