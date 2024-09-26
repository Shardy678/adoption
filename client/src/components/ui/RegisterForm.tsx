import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Label } from './label'
import { Input } from './input'
import { Alert, AlertDescription } from './alert'
import { Button } from './button'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [adopterDetails, setAdopterDetails] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://adoption-api-shardy678-nosweats-projects.vercel.app/auth/register',
        {
          email,
          password,
          adopterDetails,
        }
      )
      const { token } = response.data
      localStorage.setItem('token', token)
      navigate('/')
    } catch (error) {
      setError('Registration failed')
    }
  }

  return (
    <div className="flex items-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Зарегистрироваться</CardTitle>
          <CardDescription>
            Введите данные чтобы зарегистрироваться
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userame">Имя</Label>
              <Input
                id="userame"
                type="username"
                value={adopterDetails.name}
                onChange={(e) =>
                  setAdopterDetails({
                    ...adopterDetails,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adress">Адрес</Label>
              <Input
                id="address"
                type="text"
                value={adopterDetails.address}
                onChange={(e) =>
                  setAdopterDetails({
                    ...adopterDetails,
                    address: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="text"
                value={adopterDetails.phone}
                onChange={(e) =>
                  setAdopterDetails({
                    ...adopterDetails,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Зарегистрироваться
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterForm
