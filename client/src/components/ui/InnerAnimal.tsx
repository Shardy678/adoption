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
        title: 'Adoption Successful!',
        description: `Congratulations! You've successfully adopted ${animal.name}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Adoption Failed',
        description: 'An error occurred while trying to adopt the pet.',
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
                  <Button onClick={handleClick}>Adopt {animal.name}</Button>
                </DialogTrigger>
              )}
              <DialogContent className="max-w-[350px] sm:max-w-[425px] border rounded-lg shadow-sm">
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <CardTitle>{`Adoption Process for ${animal.name}`}</CardTitle>
                    <CardDescription>Step {step + 1} of 4</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {step === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Pet Details</h3>
                        <p>
                          <strong>Name:</strong> {animal.name}
                        </p>
                        <p>
                          <strong>Age:</strong> {animal.age} years
                        </p>
                        <p>
                          <strong>Breed:</strong> {animal.breed}
                        </p>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Confirm Interest
                        </h3>
                        <p>Are you sure you want to adopt {animal.name}?</p>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Adoption Questionnaire
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="otherPets">
                            Do you have other pets?
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
                          <Label htmlFor="hasYard">Do you have a yard?</Label>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hoursWithPet">
                            How many hours can you spend with the pet daily?
                          </Label>
                          <Input
                            id="hoursWithPet"
                            name="hoursWithPet"
                            value={questionnaire.hoursWithPet}
                            onChange={handleQuestionnaireChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Do you rent or own your home?</Label>
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
                              <Label htmlFor="rent">Rent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="own" id="own" />
                              <Label htmlFor="own">Own</Label>
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
                            Are you prepared for the responsibilities of
                            adopting this pet?
                          </Label>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Review and Confirm Adoption
                        </h3>
                        <div>
                          <h4 className="font-medium">Pet Information</h4>
                          <p>Name: {animal.name}</p>
                          <p>Age: {animal.age} years</p>
                          <p>Breed: {animal.breed}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Your Information</h4>
                          <p>Name: {userData?.user.adopterDetails.name}</p>
                          <p>Email: {userData?.user.email}</p>
                          <p>Phone: {userData?.user.adopterDetails.phone}</p>
                          <p>
                            Address: {userData?.user.adopterDetails.address}
                          </p>
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
                        Back
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button onClick={() => setStep((prev) => prev + 1)}>
                        {step === 0 ? 'Start Adoption Process' : 'Next'}
                      </Button>
                    ) : (
                      <Button onClick={async () => await handleAdopt()}>
                        Confirm Adoption
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
