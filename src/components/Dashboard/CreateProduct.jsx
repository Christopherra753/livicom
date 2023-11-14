import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/shop'
import Swal from 'sweetalert2'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import { URL } from '../../constants/url'

export function CreateProduct ({ setShowModal }) {
  const { setProducts } = useContext(ShopContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const data = await axios.get(`${URL}get-categories`)
      setCategories(data.data)
    }
    getCategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const newProduct = Object.fromEntries(formData)

    newProduct.stock = Number(newProduct.stock)
    newProduct.category = Number(newProduct.category)
    newProduct.price = Number(newProduct.price)

    const data = await axios.post(`${URL}create-product`, newProduct)

    if (data.data.id) {
      Swal.fire({
        title: 'Registro',
        text: 'El producto se registro correctamente',
        icon: 'success',
        timer: 1500
      })
    }
    const data3 = await axios.get(`${URL}get-products`)
    setProducts(data3.data)
  }

  return (
    <div className='absolute bg-black/50 top-0 left-0 w-full inset-0 flex items-center justify-center'>
      <div className='max-w-xl w-full p-5 rounded-lg bg-white'>
        <form onSubmit={handleSubmit}>
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
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Dimensiones:
              </label>
              <input
                type='text'
                name='dimensions'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese las dimensiones'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Stock:
              </label>
              <input
                type='text'
                name='stock'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el stock'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Imagen URL:
              </label>
              <input
                type='url'
                name='image'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese la URL de la imagen'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Precio:
              </label>
              <input
                type='text'
                name='price'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none'
                placeholder='Ingrese el precio'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Categoria:
              </label>
              <select
                name='category'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none appearance-none'
                required
              >
                <option value=''>Seleccione una opcion</option>
                {
                    categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
              </select>
            </div>
            <div className='flex flex-col gap-1 sm:col-span-2'>
              <label className='block text-sm font-bold tracking-wide text-shop-200'>
                Descripcion:
              </label>
              <textarea
                name='description'
                rows='4'
                cols='4'
                className='bg-gray-100 px-4 py-2 text-sm rounded-lg shadow outline-none resize-none'
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
              Registrar Producto
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
