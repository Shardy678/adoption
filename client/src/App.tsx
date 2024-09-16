import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Animal } from './types'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'
import { Input } from './components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'

function App() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[] | null>(null)
  const [error, setError] = useState('')

  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [selectedSex, setSelectedSex] = useState<string | null>(null)
  const [healthy, setHealthy] = useState<boolean | null>(null)
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null)
  const [vaccinated, setVaccinated] = useState<boolean | null>(null)
  const [sterilized, setSterilized] = useState<boolean | null>(null)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [compatibleWithCats, setCompatibleWithCats] = useState<boolean | null>(
    null
  )
  const [compatibleWithDogs, setCompatibleWithDogs] = useState<boolean | null>(
    null
  )
  const [compatibleWithPeople, setCompatibleWithPeople] = useState<
    boolean | null
  >(null)
  const [compatibleWithChildren, setCompatibleWithChildren] = useState<
    boolean | null
  >(null)

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

      if (healthy) {
        filtered = filtered.filter((animal) => animal.healthy === healthy)
      }

      if (selectedBreed) {
        filtered = filtered.filter((animal) =>
          animal.breed.toLowerCase().includes(selectedBreed.toLowerCase())
        )
      }

      if (vaccinated) {
        filtered = filtered.filter((animal) => animal.vaccinated === vaccinated)
      }

      if (sterilized) {
        filtered = filtered.filter((animal) => animal.sterilized === sterilized)
      }

      if (available) {
        filtered = filtered.filter((animal) => animal.available === available)
      }

      if (size) {
        filtered = filtered.filter((animal) => animal.size === size)
      }

      if (compatibleWithCats) {
        filtered = filtered.filter(
          (animal) => animal.compatibleWithCats === compatibleWithCats
        )
      }

      if (compatibleWithDogs) {
        filtered = filtered.filter(
          (animal) => animal.compatibleWithDogs === compatibleWithDogs
        )
      }

      if (compatibleWithPeople) {
        filtered = filtered.filter(
          (animal) => animal.compatibleWithPeople === compatibleWithPeople
        )
      }

      if (compatibleWithChildren) {
        filtered = filtered.filter(
          (animal) => animal.compatibleWithChildren === compatibleWithChildren
        )
      }

      setFilteredAnimals(filtered)
    }
  }, [
    selectedSpecies,
    selectedSex,
    healthy,
    selectedBreed,
    vaccinated,
    animals,
    sterilized,
    available,
    size,
    compatibleWithCats,
    compatibleWithDogs,
    compatibleWithPeople,
    compatibleWithChildren,
  ])

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecies(e.target.value || null)
  }

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value || null)
  }

  const handleHealthyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthy(e.target.checked || null)
  }

  const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBreed(e.target.value || null)
  }

  const handleVacinatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVaccinated(e.target.checked || null)
  }

  const handleSterilizedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSterilized(e.target.checked || null)
  }

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailable(e.target.checked || null)
  }

  const handleSizeChange = (value: string) => {
    setSize(value !== 'All' ? value : null)
  }

  const handleCompatibleWithCatsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompatibleWithCats(e.target.checked || null)
  }

  const handleCompatibleWithDogsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompatibleWithDogs(e.target.checked || null)
  }

  const handleCompatibleWithPeopleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompatibleWithPeople(e.target.checked || null)
  }

  const handleCompatibleWithChildrenChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompatibleWithChildren(e.target.checked || null)
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

        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleHealthyChange}
              checked={healthy || false}
            />
            Только здоровые
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleSterilizedChange}
              checked={sterilized || false}
            />
            Только стерилизованные
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleVacinatedChange}
              checked={vaccinated || false}
            />
            Только вакцинированные
          </label>
        </div>

        <div className="flex flex-row items-center">
          <label>Порода:</label>
          <Input
            type="text"
            onChange={handleBreedChange}
            value={selectedBreed || ''}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleAvailableChange}
              checked={available || false}
            />
            Только доступные
          </label>
        </div>

        <h1>Дружит с:</h1>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleCompatibleWithCatsChange}
              checked={compatibleWithCats || false}
            />
            Кошками
          </label>

          <label>
            <input
              type="checkbox"
              onChange={handleCompatibleWithDogsChange}
              checked={compatibleWithDogs || false}
            />
            Собаками
          </label>

          <label>
            <input
              type="checkbox"
              onChange={handleCompatibleWithPeopleChange}
              checked={compatibleWithPeople || false}
            />
            Людьми
          </label>

          <label>
            <input
              type="checkbox"
              onChange={handleCompatibleWithChildrenChange}
              checked={compatibleWithChildren || false}
            />
            Детьми
          </label>
        </div>

        <div>
          <label>Размер:</label>
          {/* <select onChange={handleSizeChange} value={size || ''}>
            <option value="">Все</option>
            <option value="Очень большой">Очень большой</option>
            <option value="Большой">Большой</option>
            <option value="Средний">Средний</option>
            <option value="Маленький">Маленький</option>
            <option value="Очень маленький">Очень маленький</option>
          </select> */}
          <Select onValueChange={handleSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Размер" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Размеры</SelectLabel>
                <SelectItem value="All">Все</SelectItem>
                <SelectItem value="Очень большой">Очень большой</SelectItem>
                <SelectItem value="Большой">Большой</SelectItem>
                <SelectItem value="Средний">Средний</SelectItem>
                <SelectItem value="Маленький">Маленький</SelectItem>
                <SelectItem value="Очень маленький">Очень маленький</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
