import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import axios from 'axios'

type Adoption = {
  id: string
  adopter: {
    adopterDetails: {
      name: string
    }
  }
  animal: {
    name: string
    species: string
    breed: string
  }
  status: 'Завершено' | 'Ожидание' | 'Отклонено'
  adoptionDate: string
}

export default function AdoptionTable() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/adoptions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data)
        setAdoptions(response.data)
      } catch (error) {
        console.error(error)
        setError('Error fetching user data')
      }
    }

    fetchAdoptions()
  }, [])
  const [sortColumn, setSortColumn] = useState<keyof Adoption>('adoptionDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const sortedAdoptions = [...adoptions].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (column: keyof Adoption) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="container mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => toggleSort('adopter')}
              className="cursor-pointer"
            >
              Adopter <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead
              onClick={() => toggleSort('animal')}
              className="cursor-pointer"
            >
              Animal <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead
              onClick={() => toggleSort('status')}
              className="cursor-pointer"
            >
              Status <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead
              onClick={() => toggleSort('adoptionDate')}
              className="cursor-pointer"
            >
              Adoption Date <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAdoptions.map((adoption) => (
            <TableRow key={adoption.id}>
              {/* Assuming `adopter` is an object with a `name` property */}
              <TableCell className="font-medium">
                {adoption.adopter.adopterDetails.name}
              </TableCell>

              {/* Assuming `animal` is an object with `name`, `species`, `breed` properties */}
              <TableCell>
                {adoption.animal.name} ({adoption.animal.species} -{' '}
                {adoption.animal.breed})
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
          ${
            adoption.status === 'Завершено'
              ? 'bg-green-100 text-green-800'
              : adoption.status === 'Ожидание'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
                >
                  {adoption.status}
                </span>
              </TableCell>

              {/* Format the date if necessary */}
              <TableCell>
                {new Date(adoption.adoptionDate).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(adoption.id)}
                    >
                      Copy adoption ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
