import Form from '@/components/ui/Form'
import Container from '@/components/ui/Container'
import Image from 'next/image'
export default function Home() {
  return (
    <Container className="flex flex-row">
      <div className="h-screen">
        <div className="h-1/2 w-full lg:w-2/3 relative">
          <Image
            src="/images/kitten.png"
            layout="fill"
            objectFit="cover"
            alt="kitten"
          />
        </div>
        <Form />
      </div>
    </Container>
  )
}
