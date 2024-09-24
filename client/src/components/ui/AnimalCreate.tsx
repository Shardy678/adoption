import React, { useState } from 'react'
import { Animal } from '../../types'
import { Input } from './input'
import { Checkbox } from './checkbox'
import { Button } from './button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'
import axios from 'axios'

const AnimalCreate: React.FC = () => {
  const [animal, setAnimal] = useState<Partial<Animal>>({
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
    available: true,
    image: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setAnimal({
      ...animal,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/animals', animal)
    } catch (error) {
      console.error('There was an error creating the animal:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={animal.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age</label>
        <Input
          type="number"
          name="age"
          value={animal.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sex</label>
        <Select
          name="sex"
          value={animal.sex}
          onValueChange={(value) => setAnimal({ ...animal, sex: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Пол" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Пол</SelectLabel>
              <SelectItem value="male">Самец</SelectItem>
              <SelectItem value="female">Самка</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Breed</label>
        <Input
          type="text"
          name="breed"
          value={animal.breed}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Species</label>
        <Input
          type="text"
          name="species"
          value={animal.species}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Vaccinated</label>
        <Checkbox
          name="vaccinated"
          checked={animal.vaccinated}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, vaccinated: checked === true })
          }
        />
      </div>
      <div>
        <label>Sterilized</label>
        <Checkbox
          name="sterilized"
          checked={animal.sterilized}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, sterilized: checked === true })
          }
        />
      </div>
      <div>
        <label>Healthy</label>
        <Checkbox
          name="healthy"
          checked={animal.healthy}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, healthy: checked === true })
          }
        />
      </div>
      <div>
        <label>Compatible with Cats</label>
        <Checkbox
          name="compatibleWithCats"
          checked={animal.compatibleWithCats}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, compatibleWithCats: checked === true })
          }
        />
      </div>
      <div>
        <label>Compatible with Dogs</label>
        <Checkbox
          name="compatibleWithDogs"
          checked={animal.compatibleWithDogs}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, compatibleWithDogs: checked === true })
          }
        />
      </div>
      <div>
        <label>Compatible with People</label>
        <Checkbox
          name="compatibleWithPeople"
          checked={animal.compatibleWithPeople}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, compatibleWithPeople: checked === true })
          }
        />
      </div>
      <div>
        <label>Compatible with Children</label>
        <Checkbox
          name="compatibleWithChildren"
          checked={animal.compatibleWithChildren}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, compatibleWithChildren: checked === true })
          }
        />
      </div>
      <div>
        <label>Size</label>
        <select name="size" value={animal.size} onChange={handleChange}>
          <option value="Очень большой">Очень большой</option>
          <option value="Большой">Большой</option>
          <option value="Средний">Средний</option>
          <option value="Маленький">Маленький</option>
          <option value="Очень маленький">Очень маленький</option>
        </select>
      </div>
      <div>
        <label>Available</label>
        <Checkbox
          name="available"
          checked={animal.available}
          onCheckedChange={(checked) =>
            setAnimal({ ...animal, available: checked === true })
          }
        />
      </div>
      <div>
        <label>Image URL</label>
        <Input
          type="text"
          name="image"
          value={animal.image}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Create Animal</Button>
    </form>
  )
}

export default AnimalCreate
