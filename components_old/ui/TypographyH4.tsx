export interface TypographyH4Props
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function TypographyH4({ children }: TypographyH4Props) {
  return <h4 className="scroll-m-20 text-xl font-semibold">{children}</h4>
}
