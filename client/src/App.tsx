import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Cat } from '@phosphor-icons/react'

function App() {
  interface Kitten {
    name: string
    breed: string
    age: number
  }

  const [kittens, setKittens] = useState<Kitten[] | null>(null) // Kitten can be null initially
  const [loading, setLoading] = useState<boolean>(true) // loading is a boolean
  const [error, setError] = useState<string>('') // error is a string

  const fetchKittensData = async (): Promise<void> => {
    try {
      const response = await axios.get<Kitten[]>(
        'http://localhost:3000/kittens'
      )
      const kittensData = response.data
      setKittens(kittensData)
      setLoading(false)
    } catch (err) {
      setError('Error fetching kittens data')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKittensData()
  }, [])

  // Render a loading state if the data is being fetched
  if (loading) {
    return <div>Loading...</div>
  }

  // Render an error message if there was an issue fetching data
  if (error) {
    return <div>{error}</div>
  }

  // Render the kitten data in cards if it was fetched successfully
  return (
    <>
      {kittens &&
        kittens.map((kitten, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex flex-row">
                {kitten.name} <Cat className="ml-2" size={32} weight="bold" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Breed: {kitten.breed}</h1>
              <h1>Age: {kitten.age}</h1>
            </CardContent>
          </Card>
        ))}
    </>
  )
}

export default App
