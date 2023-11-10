import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardHome } from '../components/DashboardHome'
import { DashboardProducts } from '../components/DashboardProducts'
import { DashboardUsers } from '../components/DashboardUsers'
import { useContext, useState } from 'react'
import { Title } from '../Layout/Title'
import { BiFilterAlt } from 'react-icons/bi'
import { ShopContext } from '../context/shop'

export function DashboardPage () {
  const { user } = useContext(ShopContext)
  const navigate = useNavigate()

  if (!user || user?.rol === 'user') {
    return navigate('/')
  }
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <div className='bg-white h-screen grid grid-cols-1 xl:grid-cols-10 pt-20'>
        <div className={`xl:col-span-2 z-20 pt-20 xl:pt-0 overflow-y-auto fixed w-[80%] md:w-[50%] xl:w-full h-full ${showMenu ? 'left-0' : '-left-full'} xl:static top-0 px-6 pb-5 border-r bg-white`}>
          <Title name='Secciones' />
          <div className='flex flex-col gap-5'>
            <NavLink to='' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Dashboard</NavLink>
            <NavLink to='products' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Productos</NavLink>
            <NavLink to='users' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Usuarios</NavLink>
          </div>
        </div>

        <div className='xl:col-span-8 overflow-y-auto px-5 z-10 relative'>
          <Routes>
            <Route path='' element={<DashboardHome />} />
            <Route path='products' element={<DashboardProducts />} />
            <Route path='users' element={<DashboardUsers />} />
          </Routes>
        </div>
      </div>
      <button onClick={() => setShowMenu(!showMenu)} className='bg-black z-50 p-2 xl:hidden rounded-full fixed bottom-10 right-10 hover:bg-black/80'><BiFilterAlt className='text-white text-3xl' /></button>
    </>
  )
}
