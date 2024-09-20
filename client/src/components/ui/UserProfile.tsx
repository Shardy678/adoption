import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card'
import { Label } from './label'
import { Input } from './input'
import { Skeleton } from './skeleton'
import { useToast } from '@/hooks/use-toast'
import Navbar from './Navbar'
import useUserData from '../hooks/useUserData'
import axiosInstance from '@/lib/axiosInstance'

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}

const UserProfile = () => {
  const { toast } = useToast()
  const [updateError, setUpdateError] = useState('')
  const { user, error, adopterDetails, email, setAdopterDetails, setEmail } =
    useUserData()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await axiosInstance.put(
        'http://localhost:3000/auth/profile',
        {
          userId: user?._id,
          email,
          adopterDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(user)
      toast({
        title: 'Success',
        description: 'User data updated',
      })
    } catch (error) {
      setUpdateError('Error updating user data')
    }
  }

  useEffect(() => {
    console.log(email, adopterDetails)
  }, [email, adopterDetails])

  if (error) {
    return <div>{error}</div>
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center min-h-screen">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.image}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <AvatarFallback className="text-2xl font-bold">
                {user.email[0].toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleUpdate}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={adopterDetails.name}
                  onChange={(e) =>
                    setAdopterDetails({
                      ...adopterDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={adopterDetails.address}
                  onChange={(e) =>
                    setAdopterDetails({
                      ...adopterDetails,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={adopterDetails.phone}
                  onChange={(e) =>
                    setAdopterDetails({
                      ...adopterDetails,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Update
                </Button>
              </div>
            </form>
            <Button onClick={logout} className="w-full" variant="destructive">
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UserProfile
