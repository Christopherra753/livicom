import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardHome } from '../components/DashboardHome'
import { DashboardProducts } from '../components/DashboardProducts'
import { DashboardUsers } from '../components/DashboardUsers'
import { useContext, useState } from 'react'
import { Title } from '../Layout/Title'
import { BiFilterAlt } from 'react-icons/bi'
import { ShopContext } from '../context/shop'
import { DashboardLink } from '../components/Dashboard/DashboardLink'
import { RiBox3Line, RiHome2Line, RiUserLine } from 'react-icons/ri'

export function DashboardPage () {
  const { user } = useContext(ShopContext)
  const navigate = useNavigate()

  if (!user || user?.rol === 'user') {
    return navigate('/')
  }
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <section className='h-screen grid grid-cols-1 xl:grid-cols-10 pt-20'>
        <nav className={`xl:col-span-2 z-30 pt-20 xl:pt-0 overflow-y-auto fixed w-[80%] md:w-[40%] lg:w-[30%] xl:w-full h-full ${showMenu ? 'left-0' : '-left-full'} xl:static top-0 px-6 pb-5 duration-200 bg-shop-300`}>

          <Title name='Secciones' />

          <ul className='flex flex-col gap-5'>

            <DashboardLink showMenu={showMenu} address='' label='Dashboard'>
              <RiHome2Line />
            </DashboardLink>

            <DashboardLink showMenu={showMenu} address='products' label='Productos'>
              <RiBox3Line />
            </DashboardLink>

            <DashboardLink showMenu={showMenu} address='users' label='Usuarios'>
              <RiUserLine />
            </DashboardLink>

          </ul>
        </nav>

        <div id='dashboard' className={`xl:col-span-8 ${showModal ? 'overflow-hidden' : 'overflow-y-auto'}  px-5 pb-5 z-20 relative`}>
          <Routes>
            <Route path='' element={<DashboardHome />} />
            <Route path='products' element={<DashboardProducts showModal={showModal} setShowModal={setShowModal} />} />
            <Route path='users' element={<DashboardUsers showModal={showModal} setShowModal={setShowModal} />} />
          </Routes>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className={`bg-black ${showModal ? 'hidden' : ''}  z-20 p-2 xl:hidden rounded-full fixed bottom-10 right-10 hover:bg-black/80`}><BiFilterAlt className='text-white text-3xl' /></button>
      </section>
    </>
  )
}
