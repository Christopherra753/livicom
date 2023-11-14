import { useContext, useEffect, useState } from 'react'
import { ProductItem } from '../components/ProductItem'
import { BiFilterAlt, BiSearch } from 'react-icons/bi'
import { Title } from '../Layout/Title'
import { ShopContext } from '../context/shop'
import axios from 'axios'

export function ProductPage () {
  const { products, setProducts } = useContext(ShopContext)
  const [showMenu, setShowMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [productStock, setProductStock] = useState(false)
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 6000
  })

  useEffect(() => {
    const getCategories = async () => {
      const data = await axios.get('http://localhost:3000/get-categories')
      setCategories(data.data)
    }
    getCategories()
  }, [])

  const reduceStock = (id, amount) => {
    // hacer una copia de los productos
    const newProducts = [...products]

    // Encontrar el indice del producto a reducir su stock
    const foundProduct = newProducts.findIndex(product => product.id === id)

    // Verificamos si lo encontro
    if (foundProduct !== -1) {
      newProducts[foundProduct].stock -= amount
      setProducts(newProducts)
    }
  }

  const searchedProducts = search
    ? [...products].filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    : [...products]

  const categoryProducts = category
    ? [...searchedProducts].filter(product => product.category_id === category)
    : [...searchedProducts]

  const priceProducts = [...categoryProducts].filter(product => product.price >= price.minPrice && product.price <= price.maxPrice)

  const stockProducts = productStock
    ? [...priceProducts].filter(product => product.stock !== 0)
    : [...priceProducts]

  return (
    <>
      <div className=' h-screen grid grid-cols-1 xl:grid-cols-10 pt-20'>
        <div className={`xl:col-span-2 z-20 pt-20 xl:pt-0 overflow-y-auto fixed w-full md:w-[50%] xl:w-full h-full ${showMenu ? 'left-0' : '-left-full'} xl:static top-0 px-6 pb-5 border-r bg-white`}>
          <Title name='Filtros' />
          <div className='flex flex-col gap-5'>
            <div>
              <label htmlFor='default-search' className='block text-sm font-semibold text-gray-900 '>Buscar: </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <BiSearch className='text-gray-500' />
                </div>
                <input onChange={(e) => setSearch(e.target.value)} id='default-search' className='w-full px-4 py-1.5 pl-10 text-sm text-gray-900 border outline-none bg-gray-50 focus:border-blue-500' placeholder='Ingresar producto' required />
              </div>
            </div>
            <div>
              <label htmlFor='countries' className='block text-sm font-semibold text-gray-900 '>Categorias</label>
              <select onChange={(e) => setCategory(Number(e.target.value))} id='countries' className='bg-gray-50 border text-gray-900 text-sm w-full px-2.5 py-1.5 outline-none focus:border-blue-500'>
                <option defaultValue=''>Todos</option>
                {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
              </select>
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-900 '>Precios: </label>
              <div className='flex items-center gap-4'>
                <div className='flex flex-1 gap-2 items-center'>
                  <label htmlFor=''>Min:</label>
                  <input onChange={(e) => setPrice({ ...price, minPrice: Number(e.target.value) })} value={price.minPrice} className=' w-full bg-gray-50 border text-gray-900 text-sm px-1 py-1.5 outline-none focus:border-blue-500' type='text' />
                </div>
                <div className='flex flex-1 gap-2 items-center'>
                  <label htmlFor=''>Max:</label>
                  <input onChange={(e) => setPrice({ ...price, maxPrice: Number(e.target.value) })} value={price.maxPrice} className='w-full bg-gray-50 border text-gray-900 text-sm px-1 py-1.5 outline-none focus:border-blue-500' type='text' />
                </div>
              </div>
            </div>
            <div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input checked={productStock} onChange={() => setProductStock(!productStock)} type='checkbox' className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>En Stock</span>
              </label>
            </div>
          </div>
        </div>

        <div className='xl:col-span-8 overflow-y-auto px-5 z-10'>
          <div className='max-w-7xl mx-auto'>
            <Title name='Nuestros productos' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
              {
            stockProducts.map(product => (
              <ProductItem key={product.id} product={product} reduceStock={reduceStock} />
            ))
          }
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setShowMenu(!showMenu)} className='bg-black z-30 p-2 xl:hidden rounded-full fixed bottom-10 right-10 hover:bg-black/80'><BiFilterAlt className='text-white text-3xl' /></button>
    </>

  )
}
