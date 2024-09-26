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
import { Calendar, PawPrint, Phone } from '@phosphor-icons/react'
import { Adoption } from '@/types'

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}

const UserProfile = () => {
  const [adoptionApplications, setAdoptionApplications] = useState<Adoption[]>(
    []
  )
  const [updateError, setUpdateError] = useState('')
  const { user, error, adopterDetails, email, setAdopterDetails, setEmail } =
    useUserData()
  const { toast } = useToast()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axiosInstance.put(
        'https://adoption-api-shardy678-nosweats-projects.vercel.app/auth/profile',
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
      toast({
        title: 'Успех',
        description: 'Данные обновлены',
      })
    } catch (error) {
      setUpdateError('Возникла ошибка при обновлении данных')
      console.error(updateError)
    }
  }

  const fetchAdoptionApplications = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axiosInstance.get(
        'https://adoption-api-shardy678-nosweats-projects.vercel.app/adoptions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const applications = response.data
      const filteredApplications = applications.filter(
        (application: Adoption) => application.adopter._id === user?._id
      )
      setAdoptionApplications(filteredApplications)
    } catch (error) {
      console.error('Error fetching adoption applications:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchAdoptionApplications()
    }
  }, [user])

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
      <div className="flex items-center flex-col min-h-screen space-y-4">
        <Card className="w-full max-w-md mx-auto mt-24">
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
            <CardTitle className="text-2xl font-bold">Профиль</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleUpdate}>
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
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
                <Label htmlFor="email">Почта</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
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
                <Label htmlFor="phone">Телефон</Label>
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
                  Обновить
                </Button>
              </div>
            </form>
            <Button onClick={logout} className="w-full" variant="destructive">
              Выйти
            </Button>
          </CardContent>
        </Card>
        {adoptionApplications.map((application: Adoption) => (
          <Card key={application._id} className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-4 flex">
              <CardTitle className="flex items-start flex-col justify-between space-y-1">
                <p>Заявки</p>
                <p className="text-sm font-normal text-gray-500">
                  #{application._id}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <PawPrint className="h-5 w-5 text-primary" />
                <span className="font-medium">{application.animal.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between ">
                  <span>Статус: {application.status}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Отправлено{' '}
                  {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Позвонить нам
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default UserProfile
