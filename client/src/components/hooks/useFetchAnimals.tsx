import { useState, useEffect } from 'react'
import axios from 'axios'
import { Animal } from '@/types'

export const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await axios.get('http://localhost:3000/animals')
  return response.data
}

export const useFetchAnimals = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const fetchAndSetAnimals = async () => {
    try {
      const animalData = await fetchAnimals()
      setAnimals(animalData)
    } catch {
      setError('Error fetching animals')
    }
  }

  useEffect(() => {
    fetchAndSetAnimals()
  }, [])

  return { animals, error, setAnimals }
}
