export interface Animal {
  _id: string
  __v: number

  name: string
  age: number
  breed: string
  species: string

  // Health
  vaccinated: boolean
  sterilized: boolean
  healthy: boolean

  // Compatibility
  compatibleWithCats: boolean
  compatibleWithDogs: boolean
  compatibleWithPeople: boolean
  compatibleWithChildren: boolean

  // Size
  size:
    | 'Очень большой'
    | 'Большой'
    | 'Средний'
    | 'Маленький'
    | 'Очень маленький'

  // Status
  available: boolean
}
