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
import { Checkbox } from './components/ui/checkbox'

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

  const handleHealthyChange = (value: boolean) => {
    setHealthy(value || null)
  }

  const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBreed(e.target.value || null)
  }

  const handleVacinatedChange = (value: boolean) => {
    setVaccinated(value || null)
  }

  const handleSterilizedChange = (value: boolean) => {
    setSterilized(value || null)
  }

  const handleAvailableChange = (value: boolean) => {
    setAvailable(value || null)
  }

  const handleSizeChange = (value: string) => {
    setSize(value !== 'All' ? value : null)
  }

  const handleCompatibleWithCatsChange = (value: boolean) => {
    setCompatibleWithCats(value || null)
  }

  const handleCompatibleWithDogsChange = (value: boolean) => {
    setCompatibleWithDogs(value || null)
  }

  const handleCompatibleWithPeopleChange = (value: boolean) => {
    setCompatibleWithPeople(value || null)
  }

  const handleCompatibleWithChildrenChange = (value: boolean) => {
    setCompatibleWithChildren(value || null)
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
        <div className="flex flex-row items-center">
          <label>Вид:</label>
          <Select
            onValueChange={(value) =>
              setSelectedSpecies(value !== 'All' ? value : null)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Вид" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Вид</SelectLabel>
                <SelectItem value="All">Все</SelectItem>
                <SelectItem value="Собака">Собака</SelectItem>
                <SelectItem value="Кошка">Кошка</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center">
          <label>Пол:</label>
          <Select
            onValueChange={(value) =>
              setSelectedSex(value !== 'All' ? value : null)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Пол" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Пол</SelectLabel>
                <SelectItem value="All">Все</SelectItem>
                <SelectItem value="male">Самец</SelectItem>
                <SelectItem value="female">Самка</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="healthy" onCheckedChange={handleHealthyChange} />
          <label htmlFor="healthy">Только здоровые</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sterilized"
            onCheckedChange={handleSterilizedChange}
            checked={sterilized || false}
          />
          <label htmlFor="sterilized">Только стерилизованные</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="vaccinated"
            onCheckedChange={handleVacinatedChange}
            checked={vaccinated || false}
          />
          <label htmlFor="vaccinated">Только вакцинированные</label>
        </div>

        <div className="flex flex-row items-center">
          <label>Порода:</label>
          <Input
            type="text"
            onChange={handleBreedChange}
            value={selectedBreed || ''}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            onCheckedChange={handleAvailableChange}
            checked={available || false}
          />
          <label htmlFor="available">Только доступные</label>
        </div>

        <h1>Дружит с:</h1>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="compatibleWithCats"
            onCheckedChange={handleCompatibleWithCatsChange}
            checked={compatibleWithCats || false}
          />
          <label htmlFor="compatibleWithCats">Кошками</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="compatibleWithDogs"
            onCheckedChange={handleCompatibleWithDogsChange}
            checked={compatibleWithDogs || false}
          />
          <label htmlFor="compatibleWithDogs">Собаками</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="compatibleWithPeople"
            onCheckedChange={handleCompatibleWithPeopleChange}
            checked={compatibleWithPeople || false}
          />
          <label htmlFor="compatibleWithPeople">Людьми</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="compatibleWithChildren"
            onCheckedChange={handleCompatibleWithChildrenChange}
            checked={compatibleWithChildren || false}
          />
          <label htmlFor="compatibleWithChildren">Детьми</label>
        </div>

        <div className="flex flex-row items-center">
          <label>Размер:</label>
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
