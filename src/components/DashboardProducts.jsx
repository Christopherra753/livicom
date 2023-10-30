import { useContext, useState } from 'react'
import { BiEdit, BiPlus, BiSearch, BiTrash, BiX } from 'react-icons/bi'
import { ShopContext } from '../context/shop'
import { CATEGORIES } from '../constants/categories'
import Swal from 'sweetalert2'

export function DashboardProducts () {
  const { products, setProducts } = useContext(ShopContext)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editProduct, setEditProduct] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    data.id = crypto.randomUUID()
    data.stock = Number(data.stock)
    data.category = Number(data.category)
    data.price = Number(data.price)
    const newProducts = [...products, data]
    setProducts(newProducts)
    setCreateModal(false)

    Swal.fire({
      title: 'Registro',
      text: 'El producto se registro correctamente',
      icon: 'success',
      timer: 1500
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro de eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        const newProducts = [...products].filter(product => product.id !== id)
        setProducts(newProducts)
        Swal.fire(
          'Eliminar',
          'Se elimino el producto correctamente',
          'success'
        )
      }
    })
  }

  const handleEdit = (id) => {
    setEditModal(true)
    const auxiliarProduct = [...products].find(product => product.id === id)
    setEditProduct(auxiliarProduct)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    data.stock = Number(data.stock)
    data.category = Number(data.category)
    data.price = Number(data.price)

    const newProducts = [...products]
    const foundIndexProduct = newProducts.findIndex(product => product.id === editProduct.id)

    newProducts[foundIndexProduct] = { ...newProducts[foundIndexProduct], ...data }
    setProducts(newProducts)

    Swal.fire({
      title: 'Actualizar',
      text: 'El producto se actualizo correctamente',
      icon: 'success',
      timer: 1500
    })

    setEditModal(false)
    setEditProduct({})
  }

  const handleCloseUpdate = () => {
    setEditModal(false)
    setEditProduct({})
  }

  return (
    <div>
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
                      type='text'
                      id='simple-search'
                      className=' focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 '
                      placeholder='Buscar Productos'
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
                  Añadir Producto
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
                      Categoria
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Dimensiones
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Precio
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Stock
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr className='border-b ' key={product.id}>
                      <th
                        scope='row'
                        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap '
                      >
                        {product.name}
                      </th>
                      <td className='px-4 py-3'>{product.category}</td>
                      <td className='px-4 py-3'>{product.dimensions}</td>
                      <td className='px-4 py-3'>S/.{product.price}</td>
                      <td className='px-4 py-3'>{product.stock}</td>
                      <td className='px-4 py-3 flex'>
                        <button
                          type='button'
                          className='flex items-center py-2 px-4 text-blue-600'
                          onClick={() => handleEdit(product.id)}
                        >
                          <BiEdit className='w-4 h-4' />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
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
          className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
        >
          <div className='relative p-4 w-full max-w-2xl max-h-full'>
            <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
              <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Añadir Producto
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
                      Nombre
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
                      htmlFor='dimensions'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Dimensiones
                    </label>
                    <input
                      type='text'
                      name='dimensions'
                      id='dimensions'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Product brand'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='stock'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Stock
                    </label>
                    <input
                      type='text'
                      name='stock'
                      id='stock'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Product brand'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='image'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Imagen
                    </label>
                    <input
                      type='text'
                      name='image'
                      id='image'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Product brand'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='price'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Precio
                    </label>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='$2999'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='category'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Categoria
                    </label>
                    <select
                      id='category'
                      name='category'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    >
                      {
                        CATEGORIES.map(category => (
                          <option className='text-white' key={category.id} value={category.id}>{category.description}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='description'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Description
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      rows='4'
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Write product description here'
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
            id='updateProductModal'
            className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
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
                        Nombre
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        defaultValue={editProduct.name}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Type product name'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='dimensions'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Dimensiones
                      </label>
                      <input
                        type='text'
                        name='dimensions'
                        id='dimensions'
                        defaultValue={editProduct.dimensions}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Product brand'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='stock'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Stock
                      </label>
                      <input
                        type='text'
                        name='stock'
                        id='stock'
                        defaultValue={editProduct.stock}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Product brand'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='image'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Imagen
                      </label>
                      <input
                        type='text'
                        name='image'
                        id='image'
                        defaultValue={editProduct.image}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Product brand'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='price'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Precio
                      </label>
                      <input
                        type='text'
                        name='price'
                        id='price'
                        defaultValue={editProduct.price}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='$2999'
                        required=''
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='category'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Categoria
                      </label>
                      <select
                        id='category'
                        name='category'
                        defaultValue={editProduct.category}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      >
                        {
                        CATEGORIES.map(category => (
                          <option className='text-white' key={category.id} value={category.id}>{category.description}</option>
                        ))
                      }
                      </select>
                    </div>
                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='description'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Description
                      </label>
                      <textarea
                        id='description'
                        name='description'
                        defaultValue={editProduct.description}
                        rows='4'
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        placeholder='Write product description here'
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
