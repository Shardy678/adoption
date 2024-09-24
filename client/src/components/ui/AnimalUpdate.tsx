import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Switch } from './switch'
import { Animal } from '@/types'
import axios from 'axios'

export default function AnimalUpdate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [petData, setPetData] = useState<Partial<Animal>>({
    name: '',
    age: '',
    sex: '',
    breed: '',
    species: '',
    vaccinated: false,
    sterilized: false,
    healthy: false,
    compatibleWithCats: false,
    compatibleWithDogs: false,
    compatibleWithPeople: false,
    compatibleWithChildren: false,
    size: 'Средний',
    available: false,
    image: '',
  })

  const fetchAnimal = async (): Promise<Animal> => {
    const response = await axios.get(`http://localhost:3000/animals/${id}`)
    return response.data
  }

  useEffect(() => {
    const getAnimal = async () => {
      const animalData = await fetchAnimal()
      setPetData(animalData)
    }
    getAnimal()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setPetData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPetData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPetData((prevData) => ({ ...prevData, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:3000/animals/${id}`, petData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('There was an error updating the animal:', error)
    }
    navigate('/admin')
    toast({
      title: 'Success',
      description: `${petData.name} updated successfully!`,
    })
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update {petData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pet Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={petData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Select
                  name="species"
                  value={petData.species}
                  onValueChange={(value) =>
                    handleSelectChange('species', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Кошка">Кошка</SelectItem>
                    <SelectItem value="Собака">Собака</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  name="breed"
                  value={petData.breed}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  value={petData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select
                  name="sex"
                  value={petData.sex}
                  onValueChange={(value) => handleSelectChange('sex', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select
                  name="size"
                  value={petData.size}
                  onValueChange={(value) => handleSelectChange('size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Очень большой">Очень большой</SelectItem>
                    <SelectItem value="Большой">Большой</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Маленький">Маленький</SelectItem>
                    <SelectItem value="Очень маленький">
                      Очень маленький
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Pet Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  value={petData.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="vaccinated"
                  checked={petData.vaccinated}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('vaccinated', checked)
                  }
                />
                <Label htmlFor="vaccinated">Vaccinated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={petData.available}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('available', checked)
                  }
                />
                <Label htmlFor="available">Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sterilized"
                  checked={petData.sterilized}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('sterilized', checked)
                  }
                />
                <Label htmlFor="sterilized">Sterilized</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="healthy"
                  checked={petData.healthy}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('healthy', checked)
                  }
                />
                <Label htmlFor="healthy">Healthy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compatibleWithCats"
                  checked={petData.compatibleWithCats}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('compatibleWithCats', checked)
                  }
                />
                <Label htmlFor="compatibleWithCats">Good with Cats</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compatibleWithDogs"
                  checked={petData.compatibleWithDogs}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('compatibleWithDogs', checked)
                  }
                />
                <Label htmlFor="compatibleWithDogs">Good with Dogs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compatibleWithPeople"
                  checked={petData.compatibleWithPeople}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('compatibleWithPeople', checked)
                  }
                />
                <Label htmlFor="compatibleWithPeople">Good with People</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compatibleWithChildren"
                  checked={petData.compatibleWithChildren}
                  onCheckedChange={(checked) =>
                    handleSwitchChange('compatibleWithChildren', checked)
                  }
                />
                <Label htmlFor="compatibleWithChildren">Good with Kids</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link to="/admin">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>

              <Button type="submit">Update Pet</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
