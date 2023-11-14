import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { ShoppingItem } from '../components/ShoppingItem'
import { useNavigate } from 'react-router-dom'
import { Title } from '../Layout/Title'

import axios from 'axios'
import { URL } from '../constants/url'

export function ProfilePageRefactor () {
  const navigate = useNavigate()
  const { setUser, user, setCart } = useContext(ShopContext)

  if (!user) {
    return navigate('/')
  }

  const [sales, setSales] = useState([])

  useEffect(() => {
    const getSalesDetail = async () => {
      const data = await axios.post(`${URL}get-sales`, { user_id: user.id })
      setSales(data.data)
    }
    getSalesDetail()
  }, [])

  const updateUser = async (event, id) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const userData = Object.fromEntries(formData)

    await axios.post(`${URL}update-user`, { ...userData, id })
    const updateUser = await axios.post(`${URL}get-user`, { id })
    setUser(updateUser.data)
    window.localStorage.setItem('user', JSON.stringify(updateUser.data))

    Swal.fire({
      title: 'Usuario',
      text: 'Se actualizo correctamente el usuario',
      icon: 'success',
      timer: 1500
    })
  }

  const logout = () => {
    Swal.fire({
      title: 'Cerrar sesion',
      text: 'Al cerrar sesion perderas tus productos añadidos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar Sesion'
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null)
        setCart([])
        navigate('/')
        window.localStorage.removeItem('user')
        Swal.fire(
          'Cerrar Sesion',
          'Se cerro sesion correctamente',
          'success'
        )
      }
    })
  }

  return (
    <>
      <div className='bg-secondary-100 p-8 rounded-xl mb-8 pt-[112px] max-w-7xl mx-auto'>
        <Title name='Perfil' />
        <hr className='my-8 border-gray-700' />
        <form onSubmit={(event) => updateUser(event, user.id)}>

          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Avatar</p>
            </div>
            <div className='flex-1'>
              <div className='w-24 h-24 rounded-full flex items-center tracking-widest justify-center text-white text-4xl bg-shop-200'>{user.name[0]}{user.last_name[0]}</div>
            </div>
          </div>

          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Nombre Completo <span className='text-red-500'>*</span></p>
            </div>
            <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input name='name' defaultValue={user.name} type='text' className='w-full py-2 px-4 outline-none bg-neutral-100 rounded-lg border-black border' placeholder='Nombre(s)' />
              </div>
              <div className='w-full'>
                <input name='last_name' defaultValue={user.last_name} type='text' className='w-full py-2 px-4 outline-none bg-neutral-100 rounded-lg border-black border' placeholder='Apellido(s)' />
              </div>
            </div>
          </div>

          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Telefono <span className='text-red-500'>*</span></p>
            </div>
            <div className='flex-1 '>
              <input name='phone' defaultValue={user.phone} type='text' className='w-full py-2 px-4 outline-none bg-neutral-100 rounded-lg border-black border' placeholder='Telefono' />
            </div>
          </div>

          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Dirección<span className='text-red-500'>*</span></p>
            </div>
            <div className='flex-1 '>
              <input name='address' defaultValue={user.address} type='text' className='w-full py-2 px-4 outline-none bg-neutral-100 rounded-lg border-black border' placeholder='Dirección' />
            </div>
          </div>

          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Correo <span className='text-red-500'>*</span></p>
            </div>
            <div className='flex-1 '>
              <input readOnly defaultValue={user.email} name='email' type='email' className='w-full py-2 px-4 outline-none bg-neutral-200 rounded-lg' />
            </div>
          </div>
          <div className='flex items-center mb-8'>
            <div className='w-1/4'>
              <p>Rol <span className='text-red-500'>*</span></p>
            </div>
            <div className='flex-1 '>
              <input readOnly defaultValue={user.rol} name='rol' type='text' className='w-full py-2 px-4 outline-none bg-neutral-200 rounded-lg' />
            </div>
          </div>
          <hr className='my-8 border-gray-700' />
          <div className='flex justify-end gap-5 font-semibold'>
            <button type='submit' className='bg-shop-200/90 text-white py-2 px-4 rounded-lg hover:bg-shop-200 transition-colors'>Actualizar</button>
            <button onClick={logout} type='button' className='bg-red-500/90 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors'>Cerrar Sesion</button>
          </div>
        </form>
        <Title name='Mis compras' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            sales?.length > 0
              ? (
                  sales.map(shop => (
                    <ShoppingItem key={shop.id} shop={shop} />
                  ))
                )
              : (<h1 className='text-center col-span-3 text-red-500 font-semibold text-2xl'>No hay compras realizadas</h1>)
          }
        </div>
      </div>
    </>

  )
}
