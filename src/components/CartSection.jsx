import { BiX } from 'react-icons/bi'
import { Title } from '../Layout/Title'
import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import { Cartitem } from './Cartitem'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export function CartSection ({ setShowCart, showCart }) {
  const { cart, setCart, products, setProducts, user, setShopping, shopping } = useContext(ShopContext)

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
      newCart[foundIndexCart].quantity -= 1
      setCart(newCart)

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
      newCart[foundIndexCart].quantity += 1
      setCart(newCart)

      newProducts[foundIndexProduct].stock -= 1
      setProducts(newProducts)
    }
  }

  const deleteProduct = (id, quantity) => {
    const newCart = [...cart].filter(product => product.id !== id)
    setCart(newCart)
    const newProducts = [...products]
    const foundProduct = newProducts.findIndex(product => product.id === id)
    if (foundProduct !== -1) {
      newProducts[foundProduct].stock += quantity
      setProducts(newProducts)
    }
  }

  const calculateTotal = () => {
    const total = [...cart].reduce((total, element) => total + (element.price * element.quantity), 0)
    return total
  }

  const buyProducts = () => {
    if (!user) {
      Swal.fire({
        title: 'Usuario',
        text: 'Necesita iniciar sesion antes de comprar',
        icon: 'info',
        timer: 1500
      })
      return
    }

    const newShopping = { id: crypto.randomUUID(), user, cart }
    setCart([])
    const newData = [...shopping, newShopping]
    setShopping(newData)

    setShowCart(false)

    Swal.fire({
      title: 'Compras',
      text: 'La compra se realizo con exito',
      icon: 'success',
      timer: 1500
    })

    navigate('/profile')
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
            <h2 className='text-2xl font-semibold'>Subtotal</h2>
            <p className='text-base text-gray-800 font-semibold'>S/.{calculateTotal()}</p>
          </div>
          <button className='text-white bg-black px-4 text-base' onClick={buyProducts}>Finalizar Compra</button>
        </div>
        <button onClick={() => setShowCart(false)} className='absolute top-5 right-5 bg-red-500 rounded-full hover:bg-red-600 duration-150'>
          <BiX className='text-4xl text-white' />
        </button>
      </div>
    </div>
  )
}
