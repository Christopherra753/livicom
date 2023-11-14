import axios from 'axios'
import Swal from 'sweetalert2'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import { useContext } from 'react'
import { ShopContext } from '../../context/shop'
import { URL } from '../../constants/url'

export function UpdateUser ({ setShowModal, editUser, setEditUser, setUsers }) {
  const { user, setUser } = useContext(ShopContext)
  const handleUpdate = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const userdata = Object.fromEntries(formData)

    await axios.post(`${URL}update-user`, { id: editUser.id, ...userdata })

    if (editUser.id === user.id) {
      const data = await axios.post(`${URL}get-user`, { id: user.id })
      window.localStorage.setItem('user', JSON.stringify(data.data))
      setUser(data.data)
    }

    Swal.fire({
      title: 'Actualizar',
      text: 'El usuario se actualizo correctamente',
      icon: 'success',
      timer: 1500
    })

    setShowModal(false)
    setEditUser(null)

    const data3 = await axios.get(`${URL}get-users`)
    setUsers(data3.data)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditUser(null)
  }

  return (
    <div className='absolute bg-black/50 top-0 left-0 w-full inset-0 flex items-center justify-center'>
      <div className='max-w-xl w-full p-5 rounded-lg bg-white'>
        <form onSubmit={handleUpdate}>
          <div className='grid gap-4 mb-4 sm:grid-cols-2'>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Nombre:
              </label>
              <input
                type='text'
                name='name'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el nombre'
                defaultValue={editUser.name}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Apellido:
              </label>
              <input
                type='text'
                name='last_name'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el apellido'
                defaultValue={editUser.last_name}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Direccion:
              </label>
              <input
                type='text'
                name='address'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese la direccion'
                defaultValue={editUser.address}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Telefono:
              </label>
              <input
                type='text'
                name='phone'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el telefono'
                defaultValue={editUser.phone}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Correo:
              </label>
              <input
                type='email'
                name='email'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el correo'
                defaultValue={editUser.email}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Rol:
              </label>
              <select
                name='rol'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none appearance-none'
                defaultValue={editUser.rol}
                required
              >
                <option value=''>Seleccione una opcion</option>
                <option value='admin'>Administrador</option>
                <option value='user'>Usuario</option>

              </select>
            </div>

          </div>
          <div className='flex flex-col sm:flex-row justify-end gap-5'>
            <button
              type='submit'
              className='bg-shop-200/90 hover:bg-shop-200 transition-colors gap-2 flex items-center text-white px-4 py-2 rounded-lg'
            >
              <RiAddLine className='w-6 h-6' />
              Actualizar Usuario
            </button>
            <button
              onClick={handleClose}
              type='button'
              className='bg-red-500/90 hover:bg-red-500 transition-colors gap-2 flex items-center text-white px-4 py-2 rounded-lg'
            >
              <RiCloseLine className='w-6 h-6' />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
