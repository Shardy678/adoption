import { Animal } from '@/types'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AnimalEdit: React.FC = () => {
  const location = useLocation()
  const animal = location.state?.animal as Animal

  const [formData, setFormData] = useState<Partial<Animal>>({
    _id: animal._id,
    name: animal.name,
    species: animal.species,
    age: animal.age,
    __v: animal.__v,
    sex: animal.sex,
    breed: animal.breed,
    vaccinated: animal.vaccinated,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .put(`http://localhost:3000/animals/${animal._id}`, formData)
      .then(() => {
        navigate('/admin')
      })
      .catch((error) => {
        console.error('There was an error updating the animal:', error)
      })
  }

  return (
    <div>
      <h1>Animal Edit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="species">Species:</label>
          <Input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Breed:</label>
          <Input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Save
        </Button>
      </form>
    </div>
  )
}

export default AnimalEdit
