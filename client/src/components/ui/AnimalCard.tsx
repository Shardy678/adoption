import { Animal } from '../../types'

interface AnimalCardProps {
  animal: Animal
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <li>
      <h2 className="font-bold">{animal.name}</h2>
      <p>Age: {animal.age}</p>
      <p>Breed: {animal.breed}</p>
      <p>Species: {animal.species}</p>
      <p>Vaccinated: {animal.vaccinated ? 'Yes' : 'No'}</p>
      <p>Sterilized: {animal.sterilized ? 'Yes' : 'No'}</p>
      <p>Healthy: {animal.healthy ? 'Yes' : 'No'}</p>
      <p>Size: {animal.size}</p>
      <p>Available: {animal.available ? 'Yes' : 'No'}</p>
      <h4 className="font-bold">Compatibility:</h4>
      <p>With Cats: {animal.compatibleWithCats ? 'Yes' : 'No'}</p>
      <p>With Dogs: {animal.compatibleWithDogs ? 'Yes' : 'No'}</p>
      <p>With People: {animal.compatibleWithPeople ? 'Yes' : 'No'}</p>
      <p>With Children: {animal.compatibleWithChildren ? 'Yes' : 'No'}</p>
    </li>
  )
}

export default AnimalCard
