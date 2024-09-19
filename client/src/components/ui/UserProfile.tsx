import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/types'

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        setError('Error fetching user data')
      }
    }

    fetchUserData()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!user) {
    return (
      <div>
        <h1>User Profile</h1>
        <p>Email: </p>
        <p>Role: </p>

        <p>Name:</p>
        <p>Address:</p>
        <p>Phone: </p>
      </div>
    )
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.role === 'user' && (
        <>
          <p>Name: {user.adopterDetails.name}</p>
          <p>Address: {user.adopterDetails.address}</p>
          <p>Phone: {user.adopterDetails.phone}</p>
        </>
      )}
    </div>
  )
}

export default UserProfile
