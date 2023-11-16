import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../constants/url'

export function LoginPage () {
  const { setUser } = useContext(ShopContext)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const user = Object.fromEntries(formData)

    const data = await axios.post(`${URL}login`, user)

    if (!data.data.result) {
      return Swal.fire({
        title: 'Login',
        text: 'Correo o contraseña incorrectos',
        icon: 'warning',
        timer: 1500
      })
    }

    const data2 = await axios.post(`${URL}get-user`, { id: data.data.result })

    setUser(data2.data)

    window.localStorage.setItem('user', JSON.stringify(data2.data))

    Swal.fire({
      title: 'Login',
      text: 'Inicio sesion correctamente',
      icon: 'success',
      timer: 1500
    })

    navigate('/profile')
  }

  return (
    <div className='max-w-screen-md mx-auto h-screen pt-20 grid items-center px-4'>
      <form onSubmit={handleSubmit} className='p-5 border rounded-lg shadow-lg'>
        <h1 className='text-3xl md:text-5xl text-black text-center mb-10 font-bold'>Inicia ahora</h1>
        <div className='flex flex-col gap-2 mb-6'>
          <label htmlFor='email' className='text-sm text-shop-200 font-semibold'>Correo:</label>
          <input name='email' type='email' id='email' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su correo' required />
        </div>
        <div className='flex flex-col gap-2 mb-6'>
          <label htmlFor='password' className='text-sm text-shop-200 font-semibold'>Password:</label>
          <input name='password' type='password' id='password' className='border rounded-lg px-2.5 py-1.5 outline-none focus:border-shop-100' placeholder='Ingrese su contraseña' required />
        </div>
        <button type='submit' className='bg-shop-200 text-white px-4 py-2 rounded-lg w-full text-lg md:text-2xl'>Iniciar</button>
      </form>
    </div>
  )
}
