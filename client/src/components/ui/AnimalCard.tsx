import { useNavigate } from 'react-router-dom'
import { Animal } from '../../types'
import { AspectRatio } from './aspect-ratio'
import { Card, CardContent, CardHeader } from './card'
import { CalendarHeart, PawPrint } from '@phosphor-icons/react'
interface AnimalCardProps {
  animal: Animal
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/animals/${animal._id}`, { state: { animal } })
  }
  return (
    <a href="#" onClick={handleClick}>
      <Card>
        <CardHeader className="min-w-[15em]">
          <AspectRatio ratio={1 / 1}>
            <img
              src={animal.image}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <h1 className="font-bold">{animal.name}</h1>
          <p className="flex flex-row items-center space-x-1">
            <CalendarHeart size={24} /> <span>{animal.age} лет</span>
          </p>
          <p className="flex flex-row items-center space-x-1">
            <PawPrint size={24} /> <span>{animal.breed}</span>
          </p>
        </CardContent>
      </Card>
    </a>
  )
}

export default AnimalCard
