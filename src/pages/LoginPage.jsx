import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export function LoginPage () {
  const { users, setUser } = useContext(ShopContext)

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const newUsers = [...users]

    const findUser = newUsers.find(element => element.email === data.email)

    if (!findUser) {
      Swal.fire({
        title: 'Login',
        text: 'El email ingresaso no existe',
        icon: 'warning',
        timer: 1500
      })
      return
    }

    if (findUser.password !== data.password) {
      Swal.fire({
        title: 'Login',
        text: 'La contraseña es incorrecta, intentelo otra vez',
        icon: 'warning',
        timer: 1500
      })
      return
    }

    setUser(findUser)

    Swal.fire({
      title: 'Login',
      text: 'Inicio sesion correctamente',
      icon: 'success',
      timer: 1500
    })

    navigate('/profile')
  }

  return (
    <div className='max-w-screen-md mx-auto h-screen pt-20 grid items-center'>
      <form onSubmit={handleSubmit} className='p-5 border rounded-lg shadow-lg'>
        <h1 className='text-5xl text-black text-center mb-10 font-bold'>Inicia ahora</h1>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Correo</label>
          <input name='email' type='email' id='email' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='john.doe@company.com' required />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-500 dark:text-white'>Contraseña</label>
          <input name='password' type='password' id='password' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ' placeholder='•••••••••' required />
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Iniciar</button>
      </form>
    </div>
  )
}
