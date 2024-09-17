import './App.css'
import AnimalCard from '@/components/ui/AnimalCard'
import Navbar from '@/components/ui/Navbar'
import AnimalFilter from './components/ui/AnimalFilter'
import { useFetchAnimals } from './components/hooks/useFetchAnimals'
import { useFilterAnimals } from './components/hooks/useFilterAnimals'

function App() {
  const { animals, error } = useFetchAnimals()
  const { filters, filteredAnimals, handleFilterChange, resetFilters } =
    useFilterAnimals(animals)

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
        <AnimalFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
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
