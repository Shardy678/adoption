import { useEffect, useState } from 'react'
import { Adoption, Animal } from '../../types'
import { useFetchAnimals } from '../hooks/useFetchAnimals'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from './button'
import Navbar from './Navbar'
import { Check, PawPrint } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from './card'

export default function Admin() {
  const { animals } = useFetchAnimals()
  const [error, setError] = useState('')

  const [adoptions, setAdoptions] = useState<Adoption[]>([])

  const fetchAdoptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adoptions')
      const adoptionData: Adoption[] = response.data
      setAdoptions(adoptionData)
    } catch {
      setError('Error fetching adoptions')
    }
  }

  const deleteAnimal = async (animal: Animal) => {
    try {
      await axios.delete(`http://localhost:3000/animals/${animal._id}`)
      fetchAdoptions()
    } catch {
      setError('Error deleting animal')
    }
  }

  const getAgeWord = (age: number) => {
    if (age % 10 === 1 && age % 100 !== 11) return 'год'
    if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100))
      return 'года'
    return 'лет'
  }

  useEffect(() => {
    fetchAdoptions()
  }, [])

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error}
      </div>
    )
  }

  const getPets = () => {
    return animals?.length
  }

  const getAvaiablePets = () => {
    return animals?.filter((animal) => animal.available).length
  }

  const stats = [
    { title: 'Total pets', value: getPets(), icon: PawPrint },
    { title: 'Total pets available', value: getAvaiablePets(), icon: Check },
    { title: 'Pending adoptions', value: 0, icon: Check },
    { title: 'Adoptions completed', value: 0, icon: Check },
    { title: 'New Pets Added', value: 0, icon: Check },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2>
          Total animals available:{' '}
          {animals?.filter((animal) => animal.available).length}
        </h2>
        <h2>Pending adoptions</h2>
        <ul>
          {adoptions
            ?.filter((adoption) => adoption.status === 'Ожидание')
            .map((adoption) => (
              <li key={adoption._id}>
                {adoption.adopter?.name
                  ? adoption.adopter.name
                  : 'Unknown adopter'}{' '}
                wants to adopt{' '}
                {adoption.animal?.name
                  ? adoption.animal.name
                  : 'Unknown animal'}
                <p>Status: {adoption.status}</p>
              </li>
            ))}
        </ul>
        <h2>All adoptions</h2>
        <ul>
          {adoptions?.map((adoption) => (
            <li key={adoption._id}>
              {adoption.adopter.name} adopted {adoption.animal.name}
              <p>Status: {adoption.status}</p>
            </li>
          ))}
        </ul>
        <Link to={`/animals/create`}>
          <Button>Add new Pet</Button>
        </Link>
        <h2>All available Pets</h2>
        <ul>
          {animals?.map((animal) => (
            <li
              key={animal._id}
              className="flex flex-row space-x-3 items-center"
            >
              <Link to={`/animals/${animal._id}`} state={{ animal }}>
                <Button variant="link">{animal.name}</Button>
              </Link>
              <p>
                {animal.age} {getAgeWord(animal.age)}
              </p>
              <p>{animal.species}</p>
              <p>{animal.breed}</p>
              <Link to={`/animals/${animal._id}/edit`} state={{ animal }}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button onClick={() => deleteAnimal(animal)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
