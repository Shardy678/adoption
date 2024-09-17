import { useState, useEffect } from 'react'
import axios from 'axios'
import { Animal } from '@/types'

export const useFetchAnimals = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/animals')
      const animalData: Animal[] = response.data
      setAnimals(animalData)
    } catch {
      setError('Error fetching animals')
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  return { animals, error }
}
