import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function RegisterPage () {
  const { setUser } = useContext(ShopContext)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formulario = event.target
    const formData = new FormData(formulario)

    const newUser = Object.fromEntries(formData)
    const data = await axios.post('http://localhost:3000/verify-email', { email: newUser.email })
    if (data.data.result) {
      Swal.fire({
        title: 'Registro',
        text: 'El correo ya existe, escoga otro',
        icon: 'error',
        timer: 1500
      })
      return
    }
    if (newUser.password !== newUser.confirm_password) {
      Swal.fire({
        title: 'Registro',
        text: 'Las contraseña no coinciden, verifiquela',
        icon: 'error',
        timer: 1500
      })
      return
    }
    const data2 = await axios.post('http://localhost:3000/create-user', { ...newUser, rol: 'user' })
    const data3 = await axios.post('http://localhost:3000/get-user', { id: data2.data.id })

    setUser(data3.data)
    window.localStorage.setItem('user', JSON.stringify(data3.data))

    Swal.fire({
      title: 'Registro',
      text: `El usuario '${newUser.name}' fue registrado satisfactoriamente`,
      icon: 'success',
      timer: 1500
    })
    navigate('/profile')
  }

  return (
    <div className='max-w-screen-md mx-auto h-screen pt-20 grid items-center'>
      <form onSubmit={handleSubmit} className='p-5 border rounded-lg shadow-lg'>
        <h1 className='text-5xl text-black text-center mb-10 font-bold'>Registrate ahora</h1>
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div>
            <label htmlFor='first_name' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Nombres</label>
            <input title='Solo se permite letras' pattern='^[A-Za-zñÑ\s]+$' name='name' type='text' id='first_name' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:border-blue-500 block w-full p-2.5 ' placeholder='John' required />
          </div>
          <div>
            <label htmlFor='last_name' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Apellidos</label>
            <input title='Solo se permite letras' pattern='^[A-Za-zñÑ\s]+$' name='last_name' type='text' id='last_name' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='Doe' required />
          </div>
          <div>
            <label htmlFor='company' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Dirección</label>
            <input title='Debe ser un formato correcto' pattern='/^[a-zA-Z0-9\s,.-]+$/i' name='address' type='text' id='company' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='Av. Jiron de la Union' required />
          </div>
          <div>
            <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Telefono</label>
            <input name='phone' type='tel' id='phone' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='Ingrese un numero de telefono' pattern='^\d{9}$' title='Formato incorrecto de telefono' required />
          </div>
        </div>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Correo</label>
          <input name='email' type='email' id='email' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='john.doe@company.com' required />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Contraseña</label>
          <input name='password' type='password' id='password' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='Ingrese una contraseña' pattern='.{8,}' title='Debe tener minimo 8 caracteres' required />
        </div>
        <div className='mb-6'>
          <label htmlFor='confirm_password' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Confirmar Contraseña</label>
          <input name='confirm_password' type='password' id='confirm_password' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='Ingrese una contraseña' pattern='.{8,}' title='Debe tener minimo 8 caracteres' required />
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Registrar</button>
      </form>
    </div>
  )
}
