import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/shop'
import Swal from 'sweetalert2'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import { URL } from '../../constants/url'

export function UpdateProduct ({ setShowModal, editProduct, setEditProduct }) {
  const { setProducts } = useContext(ShopContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const data = await axios.get(`${URL}get-categories`)
      setCategories(data.data)
    }
    getCategories()
  }, [])

  const handleUpdate = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const product = Object.fromEntries(formData)

    product.stock = Number(product.stock)
    product.category = Number(product.category)
    product.price = Number(product.price)

    await axios.post(`${URL}update-product`, { id: editProduct.id, ...product })

    Swal.fire({
      title: 'Actualizar',
      text: 'El producto se actualizo correctamente',
      icon: 'success',
      timer: 1500
    })
    setShowModal(false)
    setEditProduct(null)
    const data = await axios.get(`${URL}get-products`)
    setProducts(data.data)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditProduct(null)
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
                defaultValue={editProduct.name}
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
                defaultValue={editProduct.dimensions}
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
                defaultValue={editProduct.stock}
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
                defaultValue={editProduct.image}
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
                defaultValue={editProduct.price}
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
                defaultValue={editProduct.category_id}
                required
              >
                <option value=''>Seleccione una opcion</option>
                {
                    categories.map(category => (
                      <option key={category.id} selected={category.id === editProduct.category_id} value={category.id}>{category.name}</option>
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
                defaultValue={editProduct.description}
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
              Actualizar Producto
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
