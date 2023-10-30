import { Link } from 'react-router-dom'
import { Container } from '../Layout/Container'
import HomeIMG from '../assets/home.png'

export function HomePage () {
  return (
    <div className='bg-white'>
      <Container>
        <div className='h-full grid items-center'>
          <div className='grid items-center lg:grid-cols-2 gap-10'>
            <div className='text-center  max-w-3xl mx-auto'>
              <h1 className='text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight my-5 duration-150'>Tienda Livicom</h1>
              <p className='text-gray-500 text-base sm:text-lg md:text-xl font-medium mb-5'>
                Transforma tu hogar en un oasis de estilo con nosotros. Muebles de calidad, diseño excepcional y comodidad inigualable. Descubre el arte de vivir bien con nuestra colección exclusiva.
              </p>
              <Link to='/products' className='inline-block px-10 py-3 font-semibold bg-black text-white hover:bg-black/80 duration-150'>
                Ver Productos
              </Link>
            </div>
            <div className='mx-auto lg:mx-0'>
              <img className='w-3/4 mx-auto' src={HomeIMG} alt='Home image' />
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}
