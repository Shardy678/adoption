export interface Animal {
  _id: string
  __v: number

  name: string
  age: number
  sex: string
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
  image: string
}

export interface Adopter {
  _id: string
  __v: number

  name: string
  phone: string
  email: string

  address: {
    street: string
    city: string
  }

  createdAt: string
}

export interface Adoption {
  _id: string
  __v: number

  animal: Animal
  adopter: Adopter

  status: string

  createdAt: string
  adoptionDate: string
}

export interface User {
  _id: string
  __v: number

  email: string
  password: string
  createdAt: string
  role: string
  adopterDetails: {
    name: string
    phone: string
    address: string
  }
  image: string
}
