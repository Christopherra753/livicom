import { useContext, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/shop'
import LogoIMG from '../assets/logo.svg'
import { CartSection } from './CartSection'

export function Navigation () {
  const { user } = useContext(ShopContext)

  const [showCart, setShowCart] = useState(false)

  return (
    <nav className='shadow fixed top-0 w-full z-20 bg-white'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 h-20'>
        <NavLink to='/' className=''>
          <img src={LogoIMG} className='h-20 w-20' alt='Livicom' />
        </NavLink>
        <button type='button' className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='navbar-default' aria-expanded='false'>
          <span className='sr-only'>Open main menu</span>
          <BiMenu className='text-8xl' />
        </button>
        <div className='hidden w-full md:block md:w-auto'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <NavLink to='/about' className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500' aria-current='page'>Nosotros</NavLink>
            </li>
            <li>
              <NavLink to='/products' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Productos</NavLink>
            </li>
            <li>
              <button onClick={() => setShowCart(true)} className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Carrito</button>
            </li>

            {
              user
                ? (
                    user.rol_id === 1
                      ? (
                        <>
                          <li>
                            <NavLink to='/dashboard' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Dashboard</NavLink>
                          </li>
                          <li>
                            <NavLink to='/profile' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Perfil</NavLink>
                          </li>
                        </>
                        )
                      : (
                        <li>
                          <NavLink to='/profile' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Perfil</NavLink>
                        </li>
                        )
                  )
                : (
                  <>
                    <li>
                      <NavLink to='/login' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Inicio</NavLink>
                    </li>
                    <li>
                      <NavLink to='/register' className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Registro</NavLink>
                    </li>
                  </>
                  )

            }

          </ul>
        </div>
      </div>
      <CartSection showCart={showCart} setShowCart={setShowCart} />
    </nav>

  )
}
