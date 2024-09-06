import Form from '@/components/ui/Form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between items-center h-screen relative md:mx-16">
      {/* Container for the image to handle responsiveness and aspect ratio */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-auto overflow-hidden rounded-none md:rounded-lg">
        <div className="relative w-full h-full">
          <Image
            src="/images/kitten.png"
            width={300} // Fixed width for lazy loading
            height={300} // Fixed height for lazy loading
            alt="kitten"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Form */}
      <Form className="w-full md:w-1/3 py-5 px-5" />
    </div>
  )
}
