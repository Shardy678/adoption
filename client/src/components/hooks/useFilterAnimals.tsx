import { useState, useEffect } from 'react'
import { Animal } from '@/types'

type Filters = {
  species: string | null
  sex: string | null
  healthy: boolean | null
  breed: string
  vaccinated: boolean | null
  sterilized: boolean | null
  available: boolean | null
  size: string | null
  compatibleWithCats: boolean | null
  compatibleWithDogs: boolean | null
  compatibleWithPeople: boolean | null
  compatibleWithChildren: boolean | null
}

const initialFilters: Filters = {
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
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[] | null>(null)

  useEffect(() => {
    if (!animals) return

    const filtered = animals.filter((animal) =>
      Object.keys(filters).every((key) => {
        const value = filters[key as keyof Filters]
        if (value == null || value === '') return true

        if (key === 'breed') {
          return animal.breed
            .toLowerCase()
            .includes((value as string).toLowerCase())
        }

        return animal[key as keyof Animal] === value
      })
    )
    setFilteredAnimals(filtered)
  }, [filters, animals])

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || null }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, filteredAnimals, handleFilterChange, resetFilters }
}
