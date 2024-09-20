import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'
import { User } from '@/types'

const useUserData = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [adopterDetails, setAdopterDetails] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axiosInstance.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
        setAdopterDetails(response.data.adopterDetails)
        setEmail(response.data.email)
      } catch (error) {
        setError('Error fetching user data')
      }
    }

    fetchUserData()
  }, [])

  return { user, error, adopterDetails, email, setAdopterDetails, setEmail }
}

export default useUserData
