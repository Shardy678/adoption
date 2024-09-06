import { Button } from './button'
import TypographyH2 from './TypographyH2'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="min-h-screen flex md:items-center justify-center md:px-10">
      <div className="md:flex md:justify-between flex-row-reverse w-full items-center">
        {/* Image container */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[30rem] relative">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661508614319-b5e40d1143bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="kitten"
            className="rounded-lg"
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Text and buttons group */}
        <div className="w-full md:w-1/3 flex items-center flex-col mt-6">
          <TypographyH2 className="text-center lg:text-left max-w-80 my-4">
            Найди нового пушистого друга
          </TypographyH2>
          <div className="space-y-3 w-full px-5 md:px-0">
            <Button className="w-full">Войти</Button>
            <Button variant="outline" className="w-full">
              Зарегестрироваться
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
