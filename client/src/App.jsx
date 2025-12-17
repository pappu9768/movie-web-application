import React, { lazy, Suspense, useState } from 'react'
// import Main from './Components/Main'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'

import RefreshHandler from './helper/RefreshHandler'
import AddMovie from './AdminPanel/AddMovie'
import Edit from './AdminPanel/Edit'
const Main = lazy(() => import('./Components/Main'))

const App = () => {

  const [isAuthenticated, setIsNotAuthenticated] = useState(false)
  
  const PrivateRoutes = ({ children }) => {
    return isAuthenticated ? children : <Navigate to='/login' />
  }

  const AdminRoute = ({children}) => {
    const getRole = localStorage.getItem('Role')
    return getRole == 0 ? children : <Navigate to = '/main'/>
  
  }
  return (
    <>
      <RefreshHandler setIsNotAuthenticated={setIsNotAuthenticated} />
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element = {<Navigate to  = '/login'/>}/>
          <Route path='/main' element={
            <PrivateRoutes>
              <Main />
            </PrivateRoutes>
            
          } />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add' element = {
            <AdminRoute>
              <AddMovie/>
            </AdminRoute>
          }/>
          <Route path='/edit/:id' element={
            <AdminRoute>
              <Edit/>
            </AdminRoute>
          }/>
        </Routes>
      </Suspense>


    </>
  )
}

export default App
