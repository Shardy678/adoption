import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Bell,
  Dog,
  Cat,
  Users,
  FileText,
  BarChart2,
  Search,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useFetchAnimals } from '../hooks/useFetchAnimals'
import { Check, X } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Adoption } from '@/types'
import axios from 'axios'

export default function TestAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [adoptions, setAdoptions] = useState<Adoption[]>([])
  const [error, setError] = useState('')

  const fetchAdoptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adoptions')
      const adoptionData: Adoption[] = response.data
      setAdoptions(adoptionData)
    } catch {
      setError('Error fetching adoptions')
    }
  }

  useEffect(() => {
    fetchAdoptions()
  }, [])

  const notifications = [
    { id: 1, message: 'New adoption application received for Max' },
    { id: 2, message: "Comment added to Luna's profile" },
    { id: 3, message: "Report submitted for Charlie's listing" },
  ]

  const { animals } = useFetchAnimals()

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

  const stats = [
    { title: 'Total Pets Available', value: getTotalPets(), icon: Dog },
    {
      title: 'Adoptions Completed',
      value: getAdoptionsCompleted(),
      icon: Users,
    },
    {
      title: 'Pending Adoptions',
      value: getPendingAdoptions()к,
      icon: FileText,
    },
    { title: 'New Pets Added (last 30 days)', value: 12, icon: Cat },
  ]

  const filteredPets = animals?.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (speciesFilter === 'All' ||
        speciesFilter === '' ||
        pet.species === speciesFilter)
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pet Adoption Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pets">Pets Management</TabsTrigger>
          <TabsTrigger value="applications">Adoption Applications</TabsTrigger>
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

          {/* <Card className="mt-4">
                                                                    <CardHeader>
                                                                                    <CardTitle>Notifications</CardTitle>
                                                                    </CardHeader>
                                                                    <CardContent>
                                                                                    <ul className="space-y-2">
                                                                                                    {notifications.map((notification) => (
                                                                                                                    <li
                                                                                                                                    key={notification.id}
                                                                                                                                    className="flex items-center space-x-2"
                                                                                                                    >
                                                                                                                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                                                                                                                    <span>{notification.message}</span>
                                                                                                                    </li>
                                                                                                    ))}
                                                                                    </ul>
                                                                    </CardContent>
                                                    </Card> */}
        </TabsContent>
        <TabsContent value="pets">
          <Card>
            <CardHeader>
              <CardTitle>Pets Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 space-y-2 md:space-y-0 md:space-x-2 w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                  <Input
                    placeholder="Search pets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  <Select
                    value={speciesFilter}
                    onValueChange={setSpeciesFilter}
                    className="w-full"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Species</SelectItem>
                      <SelectItem value="Собака">Dogs</SelectItem>
                      <SelectItem value="Кошка">Cats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Link to="/animals/create" className="w-full md:w-auto">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add New Pet
                  </Button>
                </Link>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Healthy</TableHead>
                    <TableHead>Vaccinated</TableHead>
                    <TableHead>Sterilized</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Dog Compatibility</TableHead>
                    <TableHead>Cat Compatibility</TableHead>
                    <TableHead>People Compatibility</TableHead>
                    <TableHead>Children Compatibility</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPets?.map((pet) => (
                    <TableRow key={pet._id}>
                      <TableCell>{pet.name}</TableCell>
                      <TableCell>{pet.species}</TableCell>
                      <TableCell>{pet.breed}</TableCell>
                      <TableCell>{pet.age}</TableCell>
                      <TableCell>
                        {pet.available ? <Check size={20} /> : <X size={20} />}
                      </TableCell>
                      <TableCell>
                        {pet.healthy ? <Check size={20} /> : <X size={20} />}
                      </TableCell>
                      <TableCell>
                        {pet.vaccinated ? <Check size={20} /> : <X size={20} />}
                      </TableCell>
                      <TableCell>
                        {pet.sterilized ? <Check size={20} /> : <X size={20} />}
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
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Adoption applications content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users/Volunteers Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Users/Volunteers management content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports and Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reports and analytics content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
