import { Animal } from '@/types'
import { CalendarHeart, PawPrint } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'

const InnerAnimal: React.FC = () => {
  const location = useLocation()
  const animal = location.state?.animal as Animal

  if (!animal) {
    return <div>No animal data available</div>
  }

  const badges = [
    {
      label: animal.vaccinated ? 'Вакцинирован' : 'Не вакцинирован',
      value: true,
    },
    {
      label: animal.sterilized ? 'Стерилизован' : 'Не стерилизован',
      value: true,
    },
    { label: animal.healthy ? 'Здоров' : 'Не здоров', value: true },
    { label: `${animal.size}`, value: animal.size },
    { label: animal.available ? 'Доступен' : 'Не доступен', value: true },
  ]

  const compatibilityBages = [
    {
      label: animal.compatibleWithCats
        ? 'Дружит с кошками'
        : 'Не дружит с кошками',
      value: true,
    },
    {
      label: animal.compatibleWithDogs
        ? 'Дружит с собаками'
        : 'Не дружит с собаками',
      value: true,
    },
    {
      label: animal.compatibleWithPeople
        ? 'Дружит с людьми'
        : 'Не дружит с людьми',
      value: true,
    },
    {
      label: animal.compatibleWithChildren
        ? 'Дружит с детьми'
        : 'Не дружит с детьми',
      value: true,
    },
  ]

  return (
    <div className="h-screen">
      <img src={animal.image} className="h-1/2 object-cover" />
      <div className="p-4">
        <h1 className="text-3xl font-bold">{animal.name}</h1>
        <div className="flex flex-row space-x-4 mt-2">
          <div className="flex items-center text-lg">
            <CalendarHeart size={24} className="mr-2" /> {animal.age} лет
          </div>
          <div className="flex items-center text-lg">
            <PawPrint size={24} className="mr-2" /> {animal.breed}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold">Статус</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {badges.map(
            (badge, index) =>
              badge.value && (
                <Badge
                  key={index}
                  className="px-2 py-1 rounded-full"
                  variant="outline"
                >
                  {badge.label}
                </Badge>
              )
          )}
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold">Дружит с</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {compatibilityBages.map((badge, index) => (
            <Badge
              key={index}
              className="px-2 py-1 rounded-full"
              variant="outline"
            >
              {badge.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InnerAnimal
