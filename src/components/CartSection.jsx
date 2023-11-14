import { BiX } from 'react-icons/bi'
import { Title } from '../Layout/Title'
import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import { Cartitem } from './Cartitem'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function CartSection ({ setShowCart, showCart }) {
  const { cart, setCart, products, setProducts, user } = useContext(ShopContext)

  const navigate = useNavigate()

  const reduceStock = (id) => {
    // hacer una copia de los productos
    const newCart = [...cart]
    const newProducts = [...products]

    // Encontrar el indice del producto a reducir su stock
    const foundIndexCart = newCart.findIndex(product => product.id === id)
    const foundIndexProduct = newProducts.findIndex(product => product.id === id)

    // Verificamos si lo encontro
    if (foundIndexCart !== -1) {
      newCart[foundIndexCart].amount -= 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))

      newProducts[foundIndexProduct].stock += 1
      setProducts(newProducts)
    }
  }

  const increaseStock = (id) => {
    // hacer una copia de los productos
    const newCart = [...cart]
    const newProducts = [...products]

    // Encontrar el indice del producto a reducir su stock
    const foundIndexCart = newCart.findIndex(product => product.id === id)
    const foundIndexProduct = newProducts.findIndex(product => product.id === id)

    // Verificamos si lo encontro
    if (foundIndexCart !== -1) {
      newCart[foundIndexCart].amount += 1
      setCart(newCart)

      newProducts[foundIndexProduct].stock -= 1
      setProducts(newProducts)
    }
  }

  const deleteProduct = (id, amount) => {
    const newCart = [...cart].filter(product => product.id !== id)
    setCart(newCart)

    const newProducts = [...products]
    const foundProduct = newProducts.findIndex(product => product.id === id)
    if (foundProduct !== -1) {
      newProducts[foundProduct].stock += amount
      setProducts(newProducts)
    }
  }

  const calculateTotal = () => {
    const total = [...cart].reduce((total, element) => total + (element.price * element.amount), 0)
    return total
  }

  const buyProducts = async () => {
    if (!user) {
      Swal.fire({
        title: 'Usuario',
        text: 'Necesita iniciar sesion antes de comprar',
        icon: 'info',
        timer: 1500
      })
      return
    }

    const data = await axios.post('http://localhost:3000/create-sale', { user_id: user.id })

    cart.map(async element => {
      await axios.post('http://localhost:3000/create-sale-detail', { amount: element.amount, product_id: element.id, sale_id: data.data.id })
      await axios.post('http://localhost:3000/update-stock', { amount: element.amount, stock: element.stock, product_id: element.id })
    })

    Swal.fire({
      title: 'Compras',
      text: 'La compra se realizo con exito',
      icon: 'success',
      timer: 1500
    })

    navigate('/profile')
    setShowCart(false)
    setCart([])
  }

  return (
    <div className={`absolute bg-black/50 top-0 pointer-events-none left-0 w-full h-screen flex justify-end z-50 duration-500 ${showCart ? 'opacity-100 pointer-events-auto' : 'opacity-0'} '`}>
      <div className={`bg-white max-w-md w-full h-screen flex flex-col relative duration-500 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <Title name='Carrito de Compras' />
        <div className='flex-1 overflow-y-auto border-t border-b border-black'>
          {
            cart.map(product => (
              <Cartitem reduceStock={reduceStock} increaseStock={increaseStock} deleteProduct={deleteProduct} key={product.id} product={product} />
            ))
          }
        </div>
        <div className='flex justify-between py-7 px-4'>
          <div>
            <h2 className='text-2xl text-shop-200 font-semibold'>Subtotal</h2>
            <p className='text-base text-gray-800 font-semibold'>S/.{calculateTotal()}</p>
          </div>
          <button className='text-white bg-shop-200/90 hover:bg-shop-200 px-4 text-base' onClick={buyProducts}>Finalizar Compra</button>
        </div>
        <button onClick={() => setShowCart(false)} className='absolute top-5 right-5 bg-red-500 rounded-full hover:bg-red-600 duration-150'>
          <BiX className='text-4xl text-white' />
        </button>
      </div>
    </div>
  )
}
