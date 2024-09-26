import { Animal } from '@/types'
import { CalendarHeart, PawPrint, X } from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from './button'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './dialog'
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
import { Checkbox } from './checkbox'
import { RadioGroup, RadioGroupItem } from './radio-group'
import useUserData from '../hooks/useUserData'
import Navbar from './Navbar'
import axios from 'axios'
import { Maximize2 } from 'lucide-react'

const getGenderedLabel = (label: string, sex: string) => {
  if (sex === 'female') {
    switch (label) {
      case 'Здоров':
        return 'Здорова'
      case 'Не здоров':
        return 'Не здорова'
      case 'Вакцинирован':
        return 'Вакцинирована'
      case 'Не вакцинирован':
        return 'Не вакцинирована'
      case 'Стерилизован':
        return 'Стерилизована'
      case 'Не стерилизован':
        return 'Не стерилизована'
      case 'Доступен':
        return 'Доступна'
      case 'Не доступен':
        return 'Не доступна'
      default:
        return label
    }
  }
  return label
}

const getGenderedSizeLabel = (size: string, sex: string) => {
  if (sex === 'female') {
    switch (size) {
      case 'Большой':
        return 'Большая'
      case 'Средний':
        return 'Средняя'
      case 'Маленький':
        return 'Маленькая'
      default:
        return size
    }
  }
  return size
}

const InnerAnimal: React.FC = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [userData, setUserData] = useState<{
    user: {
      adopterDetails: {
        name: string
        phone: string
        address: string
      }
      email: string
      _id: string
    }
    error: any
    setAdopterDetails: (details: any) => void
    setEmail: (email: string) => void
  } | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [questionnaire, setQuestionnaire] = useState({
    otherPets: '',
    hasYard: false,
    hoursWithPet: '',
    homeOwnership: '',
    commitmentReady: false,
  })

  const { user, error, adopterDetails, email, setAdopterDetails, setEmail } =
    useUserData()
  const navigate = useNavigate()

  useEffect(() => {
    if (isButtonClicked) {
      if (error) {
        console.error(error)
        navigate('/login')
      } else if (user && adopterDetails && email) {
        setUserData({ user, error, setAdopterDetails, setEmail })
      }
    }
  }, [
    isButtonClicked,
    user,
    adopterDetails,
    email,
    error,
    setAdopterDetails,
    setEmail,
    navigate,
  ])

  const handleClick = () => {
    setIsButtonClicked(true)
  }

  const location = useLocation()
  const animal = location.state?.animal as Animal

  const resetModal = () => {
    setStep(0)
  }
  const { toast } = useToast()

  if (!animal) {
    return <div>No animal data available</div>
  }

  const badges = [
    {
      label: getGenderedLabel(
        animal.vaccinated ? 'Вакцинирован' : 'Не вакцинирован',
        animal.sex
      ),
      value: true,
    },
    {
      label: getGenderedLabel(
        animal.sterilized ? 'Стерилизован' : 'Не стерилизован',
        animal.sex
      ),
      value: true,
    },
    {
      label: getGenderedLabel(
        animal.healthy ? 'Здоров' : 'Не здоров',
        animal.sex
      ),
      value: true,
    },
    {
      label: getGenderedSizeLabel(`${animal.size}`, animal.sex),
      value: animal.size,
    },
    {
      label: getGenderedLabel(
        animal.available ? 'Доступен' : 'Не доступен',
        animal.sex
      ),
      value: true,
    },
  ]

  const compatibilityBadges = [
    {
      label: animal.compatibleWithCats
        ? 'Дружит с кошками'
        : 'Не дружит с кошками',
      value: true,
    },
    {
      label: animal.compatibleWithDogs
        ? 'Дружит с собаками'
        : 'Не дружит с собаками',
      value: true,
    },
    {
      label: animal.compatibleWithPeople
        ? 'Дружит с людьми'
        : 'Не дружит с людьми',
      value: true,
    },
    {
      label: animal.compatibleWithChildren
        ? 'Дружит с детьми'
        : 'Не дружит с детьми',
      value: true,
    },
  ]

  const handleAdopt = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      await axios.post(
        'https://adoption-api-shardy678-nosweats-projects.vercel.app/adoptions',
        {
          animalId: animal._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      await axios.put(
        `https://adoption-api-shardy678-nosweats-projects.vercel.app/animals/${animal._id}`,
        {
          available: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setIsOpen(false)
      setStep(0)
      toast({
        title: 'Усыновление успешно!',
        description: `Поздравляем! Вы приютили ${animal.name}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Усыновление неуспешно',
        description: 'Возникла ошибка при усыновлении.',
        duration: 5000,
      })
    }
  }

  const handleQuestionnaireChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setQuestionnaire((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)

  return (
    <>
      <Navbar />

      <div className="h-screen flex items-center">
        <Card className="w-full max-w-3xl mx-auto overflow-hidden">
          <div className="relative h-64">
            <img
              src={animal.image}
              alt={animal.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsImageFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <CardHeader>
            <CardTitle>{animal.name}</CardTitle>
            <div className="flex flex-row space-x-4 mt-2">
              <div className="flex items-center text-lg">
                <CalendarHeart size={24} className="mr-2" /> {animal.age} лет
              </div>
              <div className="flex items-center text-lg">
                <PawPrint size={24} className="mr-2" /> {animal.breed}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Статус</h2>
              <div className="flex flex-wrap gap-2">
                {badges.map(
                  (badge, index) =>
                    badge.value && (
                      <Badge key={index} variant="secondary">
                        {badge.label}
                      </Badge>
                    )
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Дружит с</h2>
              <div className="flex flex-wrap gap-2">
                {compatibilityBadges.map((badge, index) => (
                  <Badge key={index} variant="secondary">
                    {badge.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) resetModal()
              }}
            >
              {animal.available && (
                <DialogTrigger asChild>
                  <Button onClick={handleClick}>Приютить {animal.name}</Button>
                </DialogTrigger>
              )}
              <DialogContent className="max-w-[350px] sm:max-w-[425px] border rounded-lg shadow-sm">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>{`Усыновление ${animal.name}`}</CardTitle>
                    <CardDescription>Шаг {step + 1} of 4</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {step === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Информация про питомца
                        </h3>
                        <p>
                          <strong>Имя:</strong> {animal.name}
                        </p>
                        <p>
                          <strong>Возраст:</strong> {animal.age} лет
                        </p>
                        <p>
                          <strong>Порода:</strong> {animal.breed}
                        </p>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Подтвреждение</h3>
                        <p>Вы уверены что хотите приютить {animal.name}?</p>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Опросник</h3>
                        <div className="space-y-2">
                          <Label htmlFor="otherPets">
                            У вас есть другие животные?
                          </Label>
                          <Input
                            id="otherPets"
                            name="otherPets"
                            value={questionnaire.otherPets}
                            onChange={handleQuestionnaireChange}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasYard"
                            name="hasYard"
                            checked={questionnaire.hasYard}
                            onCheckedChange={(checked) =>
                              setQuestionnaire((prev) => ({
                                ...prev,
                                hasYard: checked as boolean,
                              }))
                            }
                          />
                          <Label htmlFor="hasYard">
                            Вы живёте в загородном доме?
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hoursWithPet">
                            Как много часов сможете уделять питомцу в день?
                          </Label>
                          <Input
                            id="hoursWithPet"
                            name="hoursWithPet"
                            value={questionnaire.hoursWithPet}
                            onChange={handleQuestionnaireChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>
                            Вы снимаете или владеете домом/квартирой?
                          </Label>
                          <RadioGroup
                            name="homeOwnership"
                            value={questionnaire.homeOwnership}
                            onValueChange={(value) =>
                              setQuestionnaire((prev) => ({
                                ...prev,
                                homeOwnership: value,
                              }))
                            }
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rent" id="rent" />
                              <Label htmlFor="rent">Снимаю</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="own" id="own" />
                              <Label htmlFor="own">Владею</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="commitmentReady"
                            name="commitmentReady"
                            checked={questionnaire.commitmentReady}
                            required
                            onCheckedChange={(checked) =>
                              setQuestionnaire((prev) => ({
                                ...prev,
                                commitmentReady: checked as boolean,
                              }))
                            }
                          />
                          <Label htmlFor="commitmentReady">
                            Готовы ли вы взять на себя ответственность за
                            усыновление этого питомца?
                          </Label>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Подтвердите решение
                        </h3>
                        <div>
                          <h4 className="font-medium">Информация о питомце</h4>
                          <p>Имя: {animal.name}</p>
                          <p>Возраст: {animal.age} years</p>
                          <p>Порода: {animal.breed}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Ваша информация</h4>
                          <p>Имя: {userData?.user.adopterDetails.name}</p>
                          <p>Почта: {userData?.user.email}</p>
                          <p>Телефон: {userData?.user.adopterDetails.phone}</p>
                          <p>Адрес: {userData?.user.adopterDetails.address}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {step > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Назад
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button onClick={() => setStep((prev) => prev + 1)}>
                        {step === 0 ? 'Начать усыновление' : 'Далее'}
                      </Button>
                    ) : (
                      <Button onClick={async () => await handleAdopt()}>
                        Подтвердить усыновление
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        {isImageFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full h-full">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-contain"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setIsImageFullscreen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default InnerAnimal
