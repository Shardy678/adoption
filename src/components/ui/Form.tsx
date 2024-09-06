import { Button } from './button'
import TypographyH2 from './TypographyH2'
import { cn } from '@/lib/utils'

export interface FormProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Form({ className }: FormProps) {
  return (
    <div
      className={cn(
        'container flex flex-col items-center lg:items-start lg:max-w-md mx-auto space-y-2',
        className
      )}
    >
      <TypographyH2 className="text-center lg:text-left max-w-80">
        Найди нового пушистого друга
      </TypographyH2>

      <Button variant="default" size="lg" className="w-full rounded-lg">
        Войти
      </Button>
      <Button variant="outline" size="lg" className="w-full rounded-lg">
        Зарегестрироваться
      </Button>
    </div>
  )
}
