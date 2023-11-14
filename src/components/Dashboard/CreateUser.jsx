import axios from 'axios'
import Swal from 'sweetalert2'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'

export function CreateUser ({ setShowModal, setUsers }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const user = Object.fromEntries(formData)
    console.log(user)

    const data = await axios.post('http://localhost:3000/create-user', user)

    if (data.data.id) {
      Swal.fire({
        title: 'Registro',
        text: 'El usuario de registro correctamente',
        icon: 'success',
        timer: 1500
      })
    }
    setShowModal(false)

    const data3 = await axios.get('http://localhost:3000/get-users')
    setUsers(data3.data)
  }

  return (
    <div className='absolute bg-black/50 top-0 left-0 w-full inset-0 flex items-center justify-center'>
      <div className='max-w-xl w-full p-5 rounded-lg bg-white'>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 mb-4 sm:grid-cols-2'>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Nombres:
              </label>
              <input
                type='text'
                name='name'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el nombre'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Apellidos:
              </label>
              <input
                type='text'
                name='last_name'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el apellido'
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
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Telefono
              </label>
              <input
                type='text'
                name='phone'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el telefono'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Correo
              </label>
              <input
                type='email'
                name='email'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el correo'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Rol
              </label>
              <select
                name='rol'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none appearance-none'
                required
              >
                <option value=''>Seleccione una opcion</option>
                <option value='admin'>Administrador</option>
                <option value='user'>Usuario</option>

              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Password
              </label>
              <input
                type='password'
                name='password'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese la contraseña'
                required
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-end gap-5'>
            <button
              type='submit'
              className='bg-shop-200/90 hover:bg-shop-200 transition-colors gap-2 flex items-center text-white px-4 py-2 rounded-lg'
            >
              <RiAddLine className='w-6 h-6' />
              Registrar Usuario
            </button>
            <button
              onClick={() => setShowModal(false)}
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
