import { useEffect, useState } from 'react'
import { BiEdit, BiPlus, BiSearch, BiTrash, BiX } from 'react-icons/bi'

import Swal from 'sweetalert2'
import { Title } from '../Layout/Title'
import axios from 'axios'

export function DashboardUsers () {
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editUser, setEditUser] = useState({})

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const searchedUsers = search
    ? [...users].filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    : [...users]

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
    setCreateModal(false)
    const data3 = await axios.get('http://localhost:3000/get-users')
    setUsers(data3.data)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post('http://localhost:3000/delete-user', { id })
        const data = await axios.get('http://localhost:3000/get-users')
        setUsers(data.data)
        Swal.fire(
          'Eliminar',
          'Se elimino el usuario correctamente',
          'success'
        )
      }
    })
  }

  const handleEdit = (id) => {
    setEditModal(true)
    const auxiliarUser = [...users].find(user => user.id === id)
    setEditUser(auxiliarUser)
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const user = Object.fromEntries(formData)

    await axios.post('http://localhost:3000/update-user', { id: editUser.id, ...user })

    Swal.fire({
      title: 'Actualizar',
      text: 'El usuario se actualizo correctamente',
      icon: 'success',
      timer: 1500
    })

    setEditModal(false)
    setEditUser({})

    const data3 = await axios.get('http://localhost:3000/get-users')
    setUsers(data3.data)
  }

  const handleCloseUpdate = () => {
    setEditModal(false)
    setEditUser({})
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await axios.get('http://localhost:3000/get-users')
      setUsers(data.data)
    }
    getUsers()
  }, [])

  return (
    <div>
      <Title name='Apartado de Usuarios' />
      <section className='p-3 sm:p-5 antialiased'>
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
          <div className='bg-white  relative shadow-md sm:rounded-lg overflow-hidden'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2'>
                <form className='flex items-center'>
                  <label htmlFor='simple-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <BiSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      type='text'
                      id='simple-search'
                      className=' focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 '
                      placeholder='Buscar Usuarios'
                      required=''
                    />
                  </div>
                </form>
              </div>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                <button
                  onClick={() => setCreateModal(true)}
                  type='button'
                  id='createProductModalButton'
                  className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none bg-black hover:bg-black/80'
                >
                  <BiPlus className='h-3.5 w-3.5 mr-2' />
                  Añadir Usuario
                </button>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 '>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                  <tr>
                    <th scope='col' className='px-4 py-4'>
                      Nombre
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Apellido
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Telefono
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Correo
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchedUsers.map((user) => (
                    <tr className='border-b ' key={user.id}>
                      <th
                        scope='row'
                        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap '
                      >
                        {user.name}
                      </th>
                      <td className='px-4 py-3'>{user.last_name}</td>
                      <td className='px-4 py-3'>{user.phone}</td>
                      <td className='px-4 py-3'>{user.email}</td>
                      <td className='px-4 py-3 flex'>
                        <button
                          type='button'
                          className='flex items-center py-2 px-4 text-blue-600'
                          onClick={() => handleEdit(user.id)}
                        >
                          <BiEdit className='w-4 h-4' />
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          type='button'
                          className='flex items-center py-2 px-4 text-red-600 '
                        >
                          <BiTrash className='w-4 h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {createModal && (
        <div
          id='createProductModal'
          className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex left-0 z-50 xl:left-40 justify-center bg-black/50 items-center w-full md:inset-0 h-full'
        >
          <div className='relative p-4 w-full max-w-2xl max-h-full'>
            <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
              <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Añadir Usuario
                </h3>
                <button
                  onClick={() => setCreateModal(false)}
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <BiX className='w-5 h-5' />
                </button>
              </div>

              <form onSubmit={handleSubmit} action='#'>
                <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Nombres
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Type product name'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='last_name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Apellidos
                    </label>
                    <input
                      type='text'
                      name='last_name'
                      id='last_name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Ingrese las dimensiones'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='address'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Direccion
                    </label>
                    <input
                      type='text'
                      name='address'
                      id='address'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder=''
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Telefono
                    </label>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Product brand'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='rol_id'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Rol
                    </label>
                    <select
                      id='rol_id'
                      name='rol'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    >
                      <option className='text-white' value='admin'>Administrador</option>
                      <option className='text-white' value='user'>Usuario</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Correo
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Ingrese un email'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Contraseña
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Ingrese una contraseña'
                      required=''
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  <BiPlus className='mr-1 -ml-1 w-6 h-6' />
                  Registrar Producto
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {
        editModal && (
          <div
            className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex left-0 z-50 xl:left-40 justify-center bg-black/50 items-center w-full md:inset-0 h-full'
          >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
              <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
                <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Update Product
                  </h3>
                  <button
                    onClick={handleCloseUpdate}
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <BiX className='w-5 h-5' />
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>

                <form onSubmit={handleUpdate} action='#'>
                  <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Nombres
                      </label>
                      <input
                        type='text'
                        name='name'
                        defaultValue={editUser.name}
                        id='name'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Type product name'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='last_name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Apellidos
                      </label>
                      <input
                        type='text'
                        name='last_name'
                        id='last_name'
                        defaultValue={editUser.last_name}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Ingrese las dimensiones'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='address'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Direccion
                      </label>
                      <input
                        type='text'
                        name='address'
                        id='address'
                        defaultValue={editUser.address}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder=''
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='phone'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Telefono
                      </label>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        defaultValue={editUser.phone}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Product brand'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='rol_id'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Rol
                      </label>
                      <select
                        id='rol_id'
                        name='rol'
                        defaultValue={editUser.rol}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      >
                        <option className='text-white' value='admin'>Administrador</option>
                        <option className='text-white' value='user'>Usuario</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Correo
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        defaultValue={editUser.email}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Ingrese un email'
                        required=''
                      />
                    </div>

                  </div>
                  <div className='flex items-center space-x-4'>
                    <button
                      type='submit'
                      className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                    >
                      Update product
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}
