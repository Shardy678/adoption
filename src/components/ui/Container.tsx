import { cn } from '@/lib/utils'

export interface ContainerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('container mx-auto', className)}>{children}</div>
}
