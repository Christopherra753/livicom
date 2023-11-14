import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Title } from '../Layout/Title'
import axios from 'axios'
import { RiAddLine, RiDeleteBinLine, RiEditBoxLine, RiSearch2Line } from 'react-icons/ri'

import { CreateUser } from './Dashboard/CreateUser'
import { UpdateUser } from './Dashboard/UpdateUser'
import { URL } from '../constants/url'

export function DashboardUsers ({ setShowModal, showModal }) {
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [search, setSearch] = useState('')

  const searchedUsers = search
    ? [...users].filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    : [...users]

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(`${URL}delete-user`, { id })
        const data = await axios.get(`${URL}get-users`)
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
    console.log([...users])
    setShowModal(true)
    const auxiliarUser = [...users].find(user => user.id === id)
    setEditUser(auxiliarUser)
    const element = document.getElementById('dashboard')
    element.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await axios.get(`${URL}get-users`)
      setUsers(data.data)
    }
    getUsers()
  }, [])

  const handleAdd = () => {
    const element = document.getElementById('dashboard')
    element.scrollTo({ top: 0, behavior: 'instant' })
    setShowModal(true)
  }

  return (
    <>
      <Title name='Apartado de Productos' />
      <div className='flex flex-col md:flex-row gap-2 justify-between mb-5'>
        <div className='relative w-full md:w-1/4'>
          <input onChange={(e) => setSearch(e.target.value)} className='border w-full  pl-9 pr-3 py-2 outline-none rounded-lg' type='text' placeholder='Ingrese el producto a buscar' />
          <RiSearch2Line className='absolute top-1/2 -translate-y-1/2 left-3' />
        </div>
        <button onClick={handleAdd} className='flex items-center gap-2 text-base justify-center bg-shop-200/90 font-semibold hover:bg-shop-200 transition-colors text-white px-4 py-2 rounded-lg '>
          <RiAddLine className='mt-0.5 text-xl' />
          Agregar Usuario
        </button>
      </div>
      <div className='overflow-x-auto shadow rounded-lg'>
        <table className='w-full text-xs sm:text-sm md:text-base text-center text-shop-200'>
          <thead className='text-gray-700 tracking-wider bg-gray-300 '>
            <tr>
              <th className='px-4 py-4'>Nombre</th>
              <th className='px-4 py-3'>Apellido</th>
              <th className='px-4 py-3'>Direccion</th>
              <th className='px-4 py-3'>Telefono</th>
              <th className='px-4 py-3'>Correo</th>
              <th className='px-4 py-3'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.map((user) => (
              <tr className='border-b  hover:bg-gray-100' key={user.id}>
                <th className='px-4 py-3 min-w-[150px] font-semibold tracking-wide '>{user.name}</th>
                <td className='px-4 py-3'>{user.last_name}</td>
                <td className='px-4 py-3'>{user.address}</td>
                <td className='px-4 py-3'>{user.phone}</td>
                <td className='px-4 py-3'>{user.email}</td>
                <td className='px-4 py-3'>
                  <RiEditBoxLine className='inline-block w-5 h-5 md:w-7 md:h-7 text-blue-600 cursor-pointer' onClick={() => handleEdit(user.id)} />
                  <RiDeleteBinLine className='ml-2 inline-block w-5 h-5 md:w-7 md:h-7 text-red-600 cursor-pointer' onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        showModal === true && editUser
          ? (<UpdateUser setUsers={setUsers} setEditUser={setEditUser} editUser={editUser} setShowModal={setShowModal} />)
          : (showModal === true && !editUser) && (<CreateUser setUsers={setUsers} setShowModal={setShowModal} />)

      }

    </>
  )
}
