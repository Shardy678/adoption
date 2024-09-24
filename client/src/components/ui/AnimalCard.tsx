import { Link } from 'react-router-dom'
import { Animal } from '../../types'
import { AspectRatio } from './aspect-ratio'
import { CalendarHeart, PawPrint } from '@phosphor-icons/react'

interface AnimalCardProps {
  animal: Animal
}

const getAgeWord = (age: number) => {
  if (age % 10 === 1 && age % 100 !== 11) return 'год'
  if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100))
    return 'года'
  return 'лет'
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link
      to={`/animals/${animal._id}`}
      state={{ animal }}
      className="min-w-[250px]"
    >
      <AspectRatio ratio={1 / 1}>
        <img
          src={animal.image}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '0.5rem',
          }}
        />
      </AspectRatio>
      <h1 className="font-bold">{animal.name}</h1>
      <p className="flex flex-row items-center space-x-1">
        <CalendarHeart size={24} />{' '}
        <span>
          {animal.age} {getAgeWord(parseInt(animal.age))}
        </span>
      </p>
      <p className="flex flex-row items-center space-x-1">
        <PawPrint size={24} /> <span>{animal.breed}</span>
      </p>
    </Link>
  )
}

export default AnimalCard
