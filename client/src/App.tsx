import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { Button } from './components/ui/button'

function App() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const initialFilters = {
    species: null,
    sex: null,
    healthy: null,
    breed: '',
    vaccinated: null,
    sterilized: null,
    available: null,
    size: null,
    compatibleWithCats: null,
    compatibleWithDogs: null,
    compatibleWithPeople: null,
    compatibleWithChildren: null,
  }

  const [filters, setFilters] = useState(initialFilters)

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/animals')
      const animalData: Animal[] = response.data
      setAnimals(animalData)
      setFilteredAnimals(animalData)
    } catch (error) {
      setError('Error fetching animals')
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  useEffect(() => {
    if (!animals) return

    const filterKeys = Object.keys(filters)
    const filtered = animals.filter((animal) =>
      filterKeys.every((key) => {
        const value = filters[key as keyof typeof filters]
        if (value == null || value == '') return true

        if (key == 'breed') {
          return animal.breed.toLowerCase().includes(value.toLowerCase())
        }

        return animal[key as keyof Animal] === value
      })
    )
    setFilteredAnimals(filtered)
  }, [filters, animals])

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || null }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error}
      </div>
    )
  }

  const selectOptions = [
    { label: 'Вид', key: 'species', options: ['Все', 'Собака', 'Кошка'] },
    { label: 'Пол', key: 'sex', options: ['Все', 'Самец', 'Самка'] },
    {
      label: 'Размер',
      key: 'size',
      options: [
        'Все',
        'Очень большой',
        'Большой',
        'Средний',
        'Маленький',
        'Очень маленький',
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center mt-24">
        <div className="flex flex-col items-start space-y-2">
          {selectOptions.map(({ label, key, options }) => (
            <div key={key} className="flex flex-row items-center">
              <label>{label}</label>
              <Select
                onValueChange={(value) =>
                  handleFilterChange(
                    key as keyof typeof filters,
                    value !== 'Все' ? value : null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="flex flex-row items-center">
            <label htmlFor="breed"> Порода:</label>
            <Input
              type="text"
              onChange={(e) => handleFilterChange('breed', e.target.value)}
              value={filters.breed || ''}
            />
          </div>

          {[
            { label: 'Только здоровые', key: 'healthy' },
            { label: 'Только стерилизованные', key: 'sterilized' },
            { label: 'Только вакцинированные', key: 'vaccinated' },
            { label: 'Только доступные', key: 'available' },
            { label: 'Дружит с кошками', key: 'compatibleWithCats' },
            { label: 'Дружит с собаками', key: 'compatibleWithDogs' },
            { label: 'Дружит с людьми', key: 'compatibleWithPeople' },
            { label: 'Дружит с детьми', key: 'compatibleWithChildren' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                onCheckedChange={(checked) =>
                  handleFilterChange(key as keyof typeof filters, checked)
                }
                checked={!!filters[key as keyof typeof filters]}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          ))}
          <Button variant="link" onClick={resetFilters}>
            Сбросить фильтры
          </Button>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredAnimals ? (
            filteredAnimals.map((animal) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
