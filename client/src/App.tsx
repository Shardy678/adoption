import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from './components/ui/animalCard'
function App() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/animals')
      const animalData = response.data
      setAnimals(animalData)
    } catch (error) {
      setError('Erorr fetching animals')
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <ul className="flex flex-row">
      {animals ? (
        animals.map((animal) => <AnimalCard key={animal._id} animal={animal} />)
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  )
}
export default App
