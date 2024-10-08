import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Dog, Cat, Users, FileText, Plus, Pencil, Trash2 } from 'lucide-react'
import { fetchAnimals, useFetchAnimals } from '../hooks/useFetchAnimals'
import { Check, X } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Adoption } from '@/types'
import axios from 'axios'
import AdoptionTable from './AdoptionsTable'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import Navbar from './Navbar'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [adoptions, setAdoptions] = useState<Adoption[]>([])
  const [error, setError] = useState('')

  const { animals, setAnimals } = useFetchAnimals()

  const fetchAdoptions = async () => {
    try {
      const response = await axios.get(
        'https://adoption-api-shardy678-nosweats-projects.vercel.app/adoptions'
      )
      const adoptionData: Adoption[] = response.data
      setAdoptions(adoptionData)
    } catch {
      setError('Error fetching adoptions')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAdoptions()
  }, [])

  const getTotalPets = () => {
    return animals?.length
  }

  const getAdoptionsCompleted = () => {
    return adoptions.filter((adoption) => adoption.status === 'Завершено')
      .length
  }

  const getPendingAdoptions = () => {
    return adoptions.filter((adoption) => adoption.status === 'Ожидание').length
  }

  const getNewPets = () => {
    const today = new Date()
    const thirtyDaysAgo = new Date(today)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return animals?.filter((pet) => new Date(pet.createdAt) > thirtyDaysAgo)
      .length
  }

  const stats = [
    { title: 'Всего животных доступно', value: getTotalPets(), icon: Dog },
    {
      title: 'Усыновлений завершено',
      value: getAdoptionsCompleted(),
      icon: Users,
    },
    {
      title: 'Заявок в ожидании',
      value: getPendingAdoptions(),
      icon: FileText,
    },
    {
      title: 'Новых животных добавлено (за последние 30 дней)',
      value: getNewPets(),
      icon: Cat,
    },
  ]

  const filteredPets = animals?.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (speciesFilter === 'All' ||
        speciesFilter === '' ||
        pet.species === speciesFilter)
  )

  const [currentPage, setCurrentPage] = useState(1)
  const petsPerPage = 10
  const totalPages = Math.max(
    1,
    Math.ceil((animals?.length || 0) / petsPerPage)
  )

  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const currentPets = filteredPets?.slice(indexOfFirstPet, indexOfLastPet)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (animals?.length === 0) {
    return <div>No pets available.</div>
  }
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `https://adoption-api-shardy678-nosweats-projects.vercel.app/animals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const animals = await fetchAnimals()
      setAnimals(animals)
      toast({
        title: 'Animal deleted succesfully',
        description: `You have deleted an animal`,
        duration: 5000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Дэшборд</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Дэшборд</TabsTrigger>
            <TabsTrigger value="pets">Управление животными</TabsTrigger>
            <TabsTrigger value="applications">Заявки</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
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
          </TabsContent>
          <TabsContent value="pets">
            <Card>
              <CardHeader>
                <CardTitle>Управление животными</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 space-y-2 md:space-y-0 md:space-x-2 w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                    <Input
                      placeholder="Найти животное..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                    <Select
                      value={speciesFilter}
                      onValueChange={setSpeciesFilter}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Отфильтровать по виду" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">Все виды</SelectItem>
                        <SelectItem value="Собака">Собаки</SelectItem>
                        <SelectItem value="Кошка">Кошки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Link to="/animals/create" className="w-full md:w-auto">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Добавить новое
                    </Button>
                  </Link>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Вид</TableHead>
                        <TableHead>Порода</TableHead>
                        <TableHead>Возраст</TableHead>
                        <TableHead>Доступен</TableHead>
                        <TableHead>Здоров</TableHead>
                        <TableHead>Вакцинирован</TableHead>
                        <TableHead>Стерилизован</TableHead>
                        <TableHead>Размер</TableHead>
                        <TableHead>Дружит с собаками</TableHead>
                        <TableHead>Дружит с кошками</TableHead>
                        <TableHead>Дружит с людьми</TableHead>
                        <TableHead>Дружит с детьми</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentPets?.map((pet) => (
                        <TableRow key={pet._id}>
                          <TableCell>{pet.name}</TableCell>
                          <TableCell>{pet.species}</TableCell>
                          <TableCell>{pet.breed}</TableCell>
                          <TableCell>{pet.age}</TableCell>
                          <TableCell>
                            {pet.available ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.healthy ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.vaccinated ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.sterilized ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>{pet.size}</TableCell>
                          <TableCell>
                            {pet.compatibleWithDogs ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.compatibleWithCats ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.compatibleWithPeople ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            {pet.compatibleWithChildren ? (
                              <Check size={20} />
                            ) : (
                              <X size={20} />
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Link to={`/admin/update/${pet._id}`}>
                                <Button variant="outline" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto flex items-center flex-col">
                                  <h4 className="mb-2">Вы уверены?</h4>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleDelete(pet._id)}
                                  >
                                    Yes
                                  </Button>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        {/* Previous Button */}
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              paginate(Math.max(1, currentPage - 1))
                            }
                            className={currentPage === 1 ? 'hidden' : ''}
                          />
                        </PaginationItem>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => paginate(index + 1)}
                              isActive={currentPage === index + 1} // Highlight current page
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {/* Next Button */}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              if (currentPage < totalPages) {
                                paginate(currentPage + 1)
                              }
                            }}
                            className={
                              currentPage === totalPages ? 'hidden' : ''
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Записи заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <AdoptionTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
