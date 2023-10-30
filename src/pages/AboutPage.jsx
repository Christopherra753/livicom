import { Container } from '../Layout/Container'
import { Title } from '../Layout/Title'
import AboutIMG from '../assets/about.jpg'

export function AboutPage () {
  return (
    <div className='bg-white'>
      <Container>
        <div className='grid h-full items-center'>
          <div className='flex flex-col lg:flex-row justify-between gap-8'>
            <div className='w-full lg:w-5/12 flex flex-col justify-center'>
              <Title name='Nosotros' />
              <p className='font-normal text-base leading-6 text-gray-600 dark:text-white'>En Livicom nuestra historia se teje con pasión por el diseño y el confort. Desde 2000, hemos ofrecido muebles de alta calidad con estilo y durabilidad. Nuestra misión es transformar hogares en espacios acogedores. Valoramos la satisfacción del cliente y la excelencia en cada pieza que creamos. Nuestro equipo de artesanos y diseñadores trabaja con dedicación para brindar a nuestros clientes productos excepcionales. Conoce más sobre nosotros y descubre cómo hacemos que tus sueños de decoración se hagan realidad.</p>
            </div>
            <div className='w-full lg:w-8/12 flex items-center'>
              <img className='w-full' src={AboutIMG} alt='A group of People' />
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-between gap-8 pt-12'>
            <div className='w-full lg:w-5/12 flex flex-col justify-center'>
              <Title name='Nuestra historia' />
              <p className='font-normal text-base leading-6 text-gray-600 dark:text-white'>Nuestra historia es una travesía de pasión y dedicación. Fundada en 2000, Livicom ha crecido desde un modesto taller hasta una destacada mueblería. Hemos evolucionado, manteniendo siempre nuestro compromiso con la calidad y el diseño.</p>
            </div>
            <div className='w-full lg:w-8/12 lg:pt-8'>
              <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md'>
                <div className='p-4 pb-6 flex justify-center flex-col items-center'>
                  <img className='md:block hidden' src='https://i.ibb.co/FYTKDG6/Rectangle-118-2.png' alt='Alexa featured Image' />
                  <img className='md:hidden block' src='https://i.ibb.co/zHjXqg4/Rectangle-118.png' alt='Alexa featured Image' />
                  <p className='font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4'>Alexa</p>
                </div>
                <div className='p-4 pb-6 flex justify-center flex-col items-center'>
                  <img className='md:block hidden' src='https://i.ibb.co/fGmxhVy/Rectangle-119.png' alt='Olivia featured Image' />
                  <img className='md:hidden block' src='https://i.ibb.co/NrWKJ1M/Rectangle-119.png' alt='Olivia featured Image' />
                  <p className='font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4'>Olivia</p>
                </div>
                <div className='p-4 pb-6 flex justify-center flex-col items-center'>
                  <img className='md:block hidden' src='https://i.ibb.co/Pc6XVVC/Rectangle-120.png' alt='Liam featued Image' />
                  <img className='md:hidden block' src='https://i.ibb.co/C5MMBcs/Rectangle-120.png' alt='Liam featued Image' />
                  <p className='font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4'>Liam</p>
                </div>
                <div className='p-4 pb-6 flex justify-center flex-col items-center'>
                  <img className='md:block hidden' src='https://i.ibb.co/7nSJPXQ/Rectangle-121.png' alt='Elijah featured image' />
                  <img className='md:hidden block' src='https://i.ibb.co/ThZBWxH/Rectangle-121.png' alt='Elijah featured image' />
                  <p className='font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4'>Elijah</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </div>
  )
}
