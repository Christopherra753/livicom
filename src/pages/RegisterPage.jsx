import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../constants/url'

export function RegisterPage () {
  const { setUser } = useContext(ShopContext)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formulario = event.target
    const formData = new FormData(formulario)

    const newUser = Object.fromEntries(formData)
    const data = await axios.post(`${URL}verify-email`, { email: newUser.email })
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
    const data2 = await axios.post(`${URL}create-user`, { ...newUser, rol: 'user' })
    const data3 = await axios.post(`${URL}get-user`, { id: data2.data.id })

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
    <div className='max-w-screen-md mx-auto h-screen pt-20 grid items-center px-4'>
      <form onSubmit={handleSubmit} className='p-5 border rounded-lg shadow-lg'>
        <h1 className='text-3xl md:text-5xl text-black text-center mb-10 font-bold'>Registrate ahora</h1>
        <div className='grid gap-2 md:gap-6 mb-2 md:mb-6 md:grid-cols-2'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='first_name' className='text-sm text-shop-200 font-semibold'>Nombres:</label>
            <input title='Solo se permite letras' pattern='^[A-Za-zñÑ\s]+$' name='name' type='text' id='first_name' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su nombre' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='last_name' className='text-sm text-shop-200 font-semibold'>Apellidos:</label>
            <input title='Solo se permite letras' pattern='^[A-Za-zñÑ\s]+$' name='last_name' type='text' id='last_name' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su apellido' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='company' className='text-sm text-shop-200 font-semibold'>Dirección:</label>
            <input title='Debe ser un formato correcto' pattern='/^[a-zA-Z0-9\s,.-]+$/i' name='address' type='text' id='company' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su dirección' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='phone' className='text-sm text-shop-200 font-semibold'>Telefono:</label>
            <input name='phone' type='tel' id='phone' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su telefono' pattern='^\d{9}$' title='Formato incorrecto de telefono' required />
          </div>
        </div>
        <div className='flex flex-col gap-1 mb-2 md:mb-6'>
          <label htmlFor='email' className='text-sm text-shop-200 font-semibold'>Correo:</label>
          <input name='email' type='email' id='email' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su correo' required />
        </div>
        <div className='flex flex-col gap-1 mb-2 md:mb-6'>
          <label htmlFor='password' className='text-sm text-shop-200 font-semibold'>Contraseña:</label>
          <input name='password' type='password' id='password' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese una contraseña' pattern='.{8,}' title='Debe tener minimo 8 caracteres' required />
        </div>
        <div className='flex flex-col gap-1 mb-6'>
          <label htmlFor='confirm_password' className='text-sm text-shop-200 font-semibold'>Confirmar Contraseña:</label>
          <input name='confirm_password' type='password' id='confirm_password' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese una contraseña' pattern='.{8,}' title='Debe tener minimo 8 caracteres' required />
        </div>
        <button type='submit' className='bg-shop-200 text-white px-4 py-2 rounded-lg w-full text-lg md:text-2xl'>Registrar</button>
      </form>
    </div>
  )
}
