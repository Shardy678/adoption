import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'
import AnimalFilter from './components/ui/AnimalFilter'

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center mt-24">
        <AnimalFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
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
