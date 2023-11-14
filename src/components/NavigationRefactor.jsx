import { NavLink } from 'react-router-dom'
import { RiMenuLine, RiCloseLine, RiShoppingCartLine } from 'react-icons/ri'
import LogoIMG from '../assets/logo.svg'
import { MenuLink } from './Navigation/MenuLink'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/shop'
import { CartSection } from './CartSection'

export function NavigationRefactor () {
  const { user, cart } = useContext(ShopContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)

  return (
    <header className='fixed top-0 w-full z-40 bg-shop-100 px-5'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto'>
        <NavLink to='/' className=''>
          <img src={LogoIMG} className='h-20 w-20' alt='Livicom' />
        </NavLink>

        <ul className='hidden md:flex gap-4'>
          <MenuLink setShowMenu={setShowMenu} address='/products' label='Productos' />
          <MenuLink setShowMenu={setShowMenu} address='/about' label='Nosotros' />
          {
              user
                ? <MenuLink setShowMenu={setShowMenu} address='/profile' label='Perfil' />
                : (
                  <>
                    <MenuLink setShowMenu={setShowMenu} address='/login' label='Iniciar' />
                    <MenuLink setShowMenu={setShowMenu} address='/register' label='Registrarse' />
                  </>
                  )
            }
          {
                user?.rol === 'admin' && <MenuLink setShowMenu={setShowMenu} address='/dashboard' label='Dashboard' />
            }
        </ul>

        <ul className={`absolute md:hidden z-10 top-0 right-0 w-full bg-black/90 h-screen ${showMenu ? 'translate-x-0' : 'translate-x-full'} duration-300`}>
          <div className='h-full text-white flex flex-col justify-center'>
            <MenuLink setShowMenu={setShowMenu} address='/products' label='Productos' />
            <MenuLink setShowMenu={setShowMenu} address='/about' label='Nosotros' />
            {
              user
                ? <MenuLink setShowMenu={setShowMenu} address='/profile' label='Perfil' />
                : (
                  <>
                    <MenuLink setShowMenu={setShowMenu} address='/login' label='Iniciar' />
                    <MenuLink setShowMenu={setShowMenu} address='/register' label='Registrarse' />
                  </>
                  )
            }
            {
                user?.rol === 'admin' && <MenuLink setShowMenu={setShowMenu} address='/dashboard' label='Dashboard' />
            }
            <button onClick={() => setShowMenu(false)} className='bg-red-500 hover:bg-red-600 transition-colors absolute top-5 right-5 rounded-full'>
              <RiCloseLine className='text-white text-4xl' />
            </button>
          </div>
        </ul>

        <section className='flex gap-5 items-center'>
          <button onClick={() => setShowCart(true)} className='relative group'>
            <RiShoppingCartLine className='text-3xl text-shop-200' />
            <span className='absolute flex items-center justify-center -top-2 -right-2 bg-shop-500 w-5 h-5 text-white rounded-full text-sm font-bold group-hover:bg-red-500 transition-colors'>{cart.length}</span>
          </button>

          <button className='md:hidden rounded-full p-2 hover:bg-shop-300/60 transition-colors' onClick={() => setShowMenu(true)}>
            <RiMenuLine className='text-3xl text-shop-200' />
          </button>
        </section>
      </nav>
      <CartSection showCart={showCart} setShowCart={setShowCart} />
    </header>
  )
}
