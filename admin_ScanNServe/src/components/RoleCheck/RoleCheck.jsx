import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RoleCheck = ({ children }) => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.publicMetadata?.role
      
      if (userRole === 'admin') {
        setIsAdmin(true)
      } else {
        toast.error('Access denied. Admin privileges required.')
        navigate('/login')
      }
    }
  }, [isLoaded, user, navigate])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return children
}

export default RoleCheck