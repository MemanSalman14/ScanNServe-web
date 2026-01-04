import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import QRGenerator from './pages/QRGenerator/QRGenerator'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import RoleCheck from './components/RoleCheck/RoleCheck'
import { useAuth } from '@clerk/clerk-react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "https://scan-n-serve-backend.vercel.app"
  const { isSignedIn, isLoaded } = useAuth()

   if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <ToastContainer />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isSignedIn ? <Navigate to="/add" replace /> : <Login />
        } />
        <Route path="/signup" element={
          isSignedIn ? <Navigate to="/add" replace /> : <Signup />
        } />

        {/* Protected Admin Routes */}
        <Route path="/*" element={
          <ProtectedRoute>
            <RoleCheck>
              <>
                <Navbar />
               
                <div className="app-content">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Navigate to="/add" replace />} />
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                    <Route path="/qr-generator" element={<QRGenerator url={url} />} />
                  </Routes>
                </div>
              </>
            </RoleCheck>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App


