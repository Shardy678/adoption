import { useState, useEffect } from 'react'
import axios from 'axios'
import { Animal } from '@/types'

export const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await axios.get(
    'https://adoption-api-shardy678-nosweats-projects.vercel.app/animals'
  )
  return response.data
}

export const useFetchAnimals = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const fetchAndSetAnimals = async () => {
    try {
      const animalData = await fetchAnimals()
      const sortedData = animalData.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
      setAnimals(sortedData)
    } catch {
      setError('Error fetching animals')
    }
  }

  useEffect(() => {
    fetchAndSetAnimals()
  }, [])

  return { animals, error, setAnimals }
}
