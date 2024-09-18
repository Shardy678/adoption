import { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import { Switch } from './switch'

export default function NewAnimalCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    status: 'Available',
    compatibleWithChildren: false,
    image: '',
  })

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
    // Here you would typically send the data to your backend API
    // For this example, we'll just simulate a successful submission
    console.log('Submitting pet data:', petData)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    navigate('/testadmin')
    toast({
      title: 'Success',
      description: 'New pet added successfully!',
    })
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Pet</CardTitle>
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
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                  type="number"
                  value={petData.age}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={petData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Adopted">Adopted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Pet Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  onChange={handleInputChange}
                />
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
              <Link to="/testadmin">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>

              <Button type="submit">Add Pet</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
