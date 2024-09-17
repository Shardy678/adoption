// AnimalFilter.tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'
import { Input } from './input'
import { Checkbox } from './checkbox'
import { Button } from './button'

interface Filters {
  species?: string | null

  sex?: string | null

  healthy?: boolean | null

  breed?: string

  vaccinated?: boolean | null

  sterilized?: boolean | null

  available?: boolean | null

  size?: string | null

  compatibleWithCats?: boolean | null

  compatibleWithDogs?: boolean | null

  compatibleWithPeople?: boolean | null

  compatibleWithChildren?: boolean | null
}

interface AnimalFilterProps {
  filters: Filters
  handleFilterChange: (key: keyof Filters, value: any) => void
  resetFilters: () => void
}

const AnimalFilter: React.FC<AnimalFilterProps> = ({
  filters,
  handleFilterChange,
  resetFilters,
}) => {
  const selectOptions = [
    { label: 'Вид', key: 'species', options: ['Все', 'Собака', 'Кошка'] },
    { label: 'Пол', key: 'sex', options: ['Все', 'Самец', 'Самка'] },
    {
      label: 'Размер',
      key: 'size',
      options: [
        'Все',
        'Очень большой',
        'Большой',
        'Средний',
        'Маленький',
        'Очень маленький',
      ],
    },
  ]

  return (
    <div className="flex flex-col items-start space-y-2">
      {selectOptions.map(({ label, key, options }) => (
        <div key={key} className="flex flex-row items-center">
          <label>{label}</label>
          <Select
            onValueChange={(value) =>
              handleFilterChange(
                key as keyof typeof filters,
                value !== 'Все' ? value : null
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}

      <div className="flex flex-row items-center">
        <label htmlFor="breed">Порода:</label>
        <Input
          type="text"
          onChange={(e) => handleFilterChange('breed', e.target.value)}
          value={filters.breed || ''}
        />
      </div>

      {[
        { label: 'Только здоровые', key: 'healthy' },
        { label: 'Только стерилизованные', key: 'sterilized' },
        { label: 'Только вакцинированные', key: 'vaccinated' },
        { label: 'Только доступные', key: 'available' },
        { label: 'Дружит с кошками', key: 'compatibleWithCats' },
        { label: 'Дружит с собаками', key: 'compatibleWithDogs' },
        { label: 'Дружит с людьми', key: 'compatibleWithPeople' },
        { label: 'Дружит с детьми', key: 'compatibleWithChildren' },
      ].map(({ label, key }) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            onCheckedChange={(checked) =>
              handleFilterChange(key as keyof typeof filters, checked)
            }
            checked={!!filters[key as keyof typeof filters]}
          />
          <label htmlFor={key}>{label}</label>
        </div>
      ))}

      <Button variant="link" onClick={resetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  )
}

export default AnimalFilter
