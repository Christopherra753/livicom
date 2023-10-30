import { NavLink, Route, Routes } from 'react-router-dom'
import { DashboardHome } from '../components/DashboardHome'
import { DashboardProducts } from '../components/DashboardProducts'
import { DashboardUsers } from '../components/DashboardUsers'

export function DashboardPage () {
  return (
    <div className='pt-24 '>
      <h1 className='text-center text-gray-800 text-4xl font-semibold'>Dashboard</h1>
      <div className='flex space-x-4 justify-center gap-10'>
        <NavLink to='' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Dashboard</NavLink>
        <NavLink to='products' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Productos</NavLink>
        <NavLink to='users' className='text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Usuarios</NavLink>
      </div>
      <Routes>
        <Route path='' element={<DashboardHome />} />
        <Route path='products' element={<DashboardProducts />} />
        <Route path='users' element={<DashboardUsers />} />
      </Routes>
    </div>
  )
}
