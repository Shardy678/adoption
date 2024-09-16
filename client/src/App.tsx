import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'

function App() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [selectedSex, setSelectedSex] = useState<string | null>(null)

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
    if (animals) {
      let filtered = animals

      if (selectedSpecies) {
        filtered = filtered.filter(
          (animal) => animal.species === selectedSpecies
        )
      }

      if (selectedSex) {
        filtered = filtered.filter((animal) => animal.sex === selectedSex)
      }

      setFilteredAnimals(filtered)
    }
  }, [selectedSpecies, selectedSex])

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecies(e.target.value || null)
  }

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value || null)
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
        <div>
          <label>Вид:</label>
          <select onChange={handleSpeciesChange} value={selectedSpecies || ''}>
            <option value="">Все</option>
            <option value="Собака">Собака</option>
            <option value="Кошка">Кошка</option>
          </select>
        </div>

        <div>
          <label>Пол:</label>
          <select onChange={handleSexChange} value={selectedSex || ''}>
            <option value="">Все</option>
            <option value="male">Самец</option>
            <option value="female">Самка</option>
          </select>
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
