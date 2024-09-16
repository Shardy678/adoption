import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './components/ui/drawer'
import { Button } from './components/ui/button'
function App() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/animals')
      const animalData = response.data
      setAnimals(animalData)
    } catch (error) {
      setError('Error fetching animals')
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error}
      </div>
    )
  }

  const cats = animals?.filter((animal) => animal.species === 'Кошка')
  const dogs = animals?.filter((animal) => animal.species === 'Собака')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Кошки</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {cats ? (
            cats.map((cat) => <AnimalCard key={cat._id} animal={cat} />)
          ) : (
            <div>Loading...</div>
          )}
        </ul>
        <h2 className="text-2xl font-bold mb-4">Собаки</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dogs ? (
            dogs.map((dog) => <AnimalCard key={dog._id} animal={dog} />)
          ) : (
            <div>Loading...</div>
          )}
        </ul>
      </div>
    </div>
  )
}
export default App
