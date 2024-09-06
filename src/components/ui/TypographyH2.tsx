import { cn } from '@/lib/utils'

export interface TypographyH2Props
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function TypographyH2({
  children,
  className,
}: TypographyH2Props) {
  return (
    <h4
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-sans',
        className
      )}
    >
      {children}
    </h4>
  )
}
