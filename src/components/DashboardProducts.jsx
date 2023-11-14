import { useContext, useState } from 'react'

import { RiAddLine, RiSearch2Line, RiEditBoxLine, RiDeleteBinLine } from 'react-icons/ri'

import { ShopContext } from '../context/shop'
import { Title } from '../Layout/Title'

import axios from 'axios'
import Swal from 'sweetalert2'
import { CreateProduct } from './Dashboard/CreateProduct'
import { UpdateProduct } from './Dashboard/UpdateProduct'
import { URL } from '../constants/url'

export function DashboardProducts ({ setShowModal, showModal }) {
  const { products, setProducts } = useContext(ShopContext)
  const [editProduct, setEditProduct] = useState(null)
  const [search, setSearch] = useState('')

  const searchedProducts = search
    ? [...products].filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    : [...products]

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro de eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(`${URL}delete-product`, { id })
        const data = await axios.get(`${URL}get-products`)
        setProducts(data.data)
        Swal.fire(
          'Eliminar',
          'Se elimino el producto correctamente',
          'success'
        )
      }
    })
  }

  const handleEdit = (id) => {
    setShowModal(true)
    const auxiliarProduct = [...products].find(product => product.id === id)
    setEditProduct(auxiliarProduct)
    const element = document.getElementById('dashboard')
    element.scrollTo({ top: 0, behavior: 'instant' })
    console.log(auxiliarProduct)
  }

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
          Agregar Producto
        </button>
      </div>
      <div className='overflow-x-auto shadow rounded-lg'>
        <table className='w-full text-xs sm:text-sm md:text-base text-center text-shop-200'>
          <thead className='text-gray-700 tracking-wider bg-gray-300 '>
            <tr>
              <th className='px-4 py-4'>Nombre</th>
              <th className='px-4 py-3'>Categoria</th>
              <th className='px-4 py-3'>Dimensiones</th>
              <th className='px-4 py-3'>Precio</th>
              <th className='px-4 py-3'>Stock</th>
              <th className='px-4 py-3'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchedProducts.map((product) => (
              <tr className='border-b  hover:bg-gray-100' key={product.id}>
                <th className='px-4 py-3 min-w-[150px] font-semibold tracking-wide '>{product.name}</th>
                <td className='px-4 py-3'>{product.category_name}</td>
                <td className='px-4 py-3'>{product.dimensions}</td>
                <td className='px-4 py-3'>S/.{product.price}</td>
                <td className='px-4 py-3'>
                  <span
                    className={`${product.stock <= 10 ? 'bg-red-700' : 'bg-green-700'} px-4 py-0.5 rounded-lg font-semibold text-white`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <RiEditBoxLine className='inline-block w-5 h-5 md:w-7 md:h-7 text-blue-600 cursor-pointer' onClick={() => handleEdit(product.id)} />
                  <RiDeleteBinLine className='ml-2 inline-block w-5 h-5 md:w-7 md:h-7 text-red-600 cursor-pointer' onClick={() => handleDelete(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        showModal === true && editProduct
          ? (<UpdateProduct setEditProduct={setEditProduct} editProduct={editProduct} setShowModal={setShowModal} />)
          : (showModal === true && !editProduct) && (<CreateProduct setShowModal={setShowModal} />)

      }
    </>
  )
}
