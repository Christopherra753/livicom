import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import { Cartitem } from '../components/Cartitem'
import Swal from 'sweetalert2'
import { Container } from '../Layout/Container'
import { Title } from '../Layout/Title'

export function CartPage () {
  const { cart, setCart, products, setProducts, user, setShopping, shopping } = useContext(ShopContext)

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
  }

  return (

    <div className='bg-white'>
      <Container className='mx-auto px-4 sm:px-6 py-10 sm:py-24 max-w-7xl lg:px-8'>
        <Title name='Carrito de Compras' />
        {
            cart.length > 0
              ? (
                <div className='mx-auto justify-center px-6 md:flex md:space-x-6 xl:px-0 mt-6'>
                  <div className='rounded-lg md:w-2/3'>
                    {
                      cart.map(product => (
                        <Cartitem reduceStock={reduceStock} increaseStock={increaseStock} deleteProduct={deleteProduct} calculateTotal={calculateTotal} key={product.id} product={product} />
                      ))
                    }
                  </div>
                  <div className=' h-full rounded-lg border md:sticky md:top-24 bg-white p-6 shadow-md md:mt-0 md:w-1/3'>

                    <div className='flex justify-between flex-1'>
                      <p className='text-lg font-bold'>Total</p>
                      <div className=''>
                        <p className='mb-1 text-lg font-bold'>${calculateTotal()}</p>
                      </div>
                    </div>
                    <button onClick={buyProducts} className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>Comprar</button>
                  </div>
                </div>
                )
              : <h3 className='text-center text-gray-900 text-4xl mt-20 font-bold'>No hay Añadido ningun producto a tu carrito de compras</h3>
          }
      </Container>
    </div>

  )
}
