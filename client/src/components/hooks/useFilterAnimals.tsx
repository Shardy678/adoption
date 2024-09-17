import { useState, useEffect } from 'react'
import { Animal } from '@/types'

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

export const useFilterAnimals = (animals: Animal[] | null) => {
  const [filters, setFilters] = useState(initialFilters)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[] | null>(null)

  useEffect(() => {
    if (!animals) return

    const filtered = animals.filter((animal) =>
      Object.keys(filters).every((key) => {
        const value = filters[key as keyof typeof initialFilters]
        if (value == null || value === '') return true

        if (key === 'breed') {
          return animal.breed.toLowerCase().includes(value.toLowerCase())
        }

        return animal[key as keyof Animal] === value
      })
    )
    setFilteredAnimals(filtered)
  }, [filters, animals])

  const handleFilterChange = (key: keyof typeof initialFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || null }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, filteredAnimals, handleFilterChange, resetFilters }
}
