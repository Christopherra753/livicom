import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { ShoppingItem } from '../components/ShoppingItem'
import { useNavigate } from 'react-router-dom'
import { Container } from '../Layout/Container'
import { Title } from '../Layout/Title'
import { BiLogOutCircle } from 'react-icons/bi'

export function ProfilePage () {
  const navigate = useNavigate()
  const { setUser, user, setUsers, users, shopping, setCart } = useContext(ShopContext)

  const filterShopping = [...shopping].filter(element => element.user.id === user.id)

  const updateUser = (event, id) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Nuevos usuarios
    const newUsers = [...users]

    // Obtener el indice del usuario
    const indexUser = newUsers.findIndex(user => user.id === id)

    newUsers[indexUser] = { ...newUsers, ...data }

    setUsers(newUsers)

    setUser(newUsers[indexUser])

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
        Swal.fire(
          'Cerrar Sesion',
          'Se cerro sesion correctamente',
          'success'
        )
      }
    })
  }

  return (
    <div className='bg-white'>
      <Container>
        <Title name='Perfil' />
        <form onSubmit={(event) => updateUser(event, user.id)} className='flex flex-col gap-6 max-w-lg mx-auto'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-500 dark:text-white  duration-150' htmlFor=''>Nombres: </label>
            <input name='name' className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:border-blue-500 block w-full p-2.5 ' type='text' defaultValue={user.name} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-500 dark:text-white  duration-150' htmlFor=''>Apellidos: </label>
            <input name='last_name' className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:border-blue-500 block w-full p-2.5 ' type='text' defaultValue={user.last_name} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-500 dark:text-white  duration-150' htmlFor=''>Telefono: </label>
            <input name='phone' className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:border-blue-500 block w-full p-2.5 ' type='text' defaultValue={user.phone} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-500 dark:text-white  duration-150' htmlFor=''>Direccion: </label>
            <input name='address' className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:border-blue-500 block w-full p-2.5 ' type='text' defaultValue={user.address} />
          </div>
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Actualizar</button>
        </form>
        <Title name='Mis compras' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            filterShopping.length > 0
              ? (
                  filterShopping.map(shop => (
                    <ShoppingItem key={shop.id} shop={shop} />
                  ))
                )
              : (<h1 className='text-center text-red-500 font-semibold text-2xl'>No hay compras realizadas</h1>)
          }
        </div>
        <button onClick={logout} className='absolute top-24 right-5 p-1 bg-red-500 rounded-full hover:bg-red-600 duration-150'><BiLogOutCircle className='text-3xl text-white' /></button>
      </Container>
    </div>

  )
}
