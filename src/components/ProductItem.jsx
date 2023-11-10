import { useContext, useState } from 'react'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { ShopContext } from '../context/shop'
import Swal from 'sweetalert2'

export function ProductItem ({ product, reduceStock }) {
  const [amount, setAmount] = useState(1)
  const { setCart, cart } = useContext(ShopContext)

  const plusAmount = () => {
    if (amount >= product.stock) return
    setAmount(amount + 1)
  }

  const minusAmount = () => {
    if (amount <= 1) return
    setAmount(amount - 1)
  }

  const buyProduct = () => {
    // Creamos una copia del carrito
    const newCart = [...cart]

    // Verificar si el producto ya se encuentra en el carrito
    const foundIndex = newCart.findIndex(element => element.id === product.id)

    // Si se encuentra lo actualizamos
    if (foundIndex !== -1) {
      newCart[foundIndex].amount += amount
    } else {
      newCart.push({ ...product, amount })
    }

    // Seteamos el valor del carrito
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))

    // Reducimos el stock
    reduceStock(product.id, amount)

    // Volvemos al estado inicial de la cantidad
    setAmount(1)

    Swal.fire({
      title: 'Producto añadido',
      text: `El producto '${product.name}' fue añadido satisfactoriamente`,
      icon: 'success',
      timer: 1500
    })
  }

  const withoutProducts = () => product.stock === 0

  return (
    <fieldset disabled={withoutProducts()}>
      <div className='border border-neutral-200 mx-auto max-w-sm sm:max-w-none p-4 relative flex flex-col h-full hover:shadow-xl duration-200'>
        <img className='sm:w-full h-full object-contain' src={product.image} alt='Product Image' />
        <div className='flex-1 flex flex-col gap-2 justify-between'>
          <h2 className='text-2xl text-gray-700 font-semibold text-center'>{product.name}</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <p className='text-slate-600 font-medium self-center text-lg'>Precio: <span>S/. {product.price}</span></p>
              <div className='flex items-center self-end border p-1'>
                <button onClick={plusAmount} className='px-2'> <BiPlus /> </button>
                <input readOnly className='w-10  px-2 py-1 text-center outline-none' type='text' value={amount} />
                <button onClick={minusAmount} className='px-2'> <BiMinus /> </button>
              </div>

            </div>
            <button onClick={buyProduct} className='bg-blue-500 text-white w-full py-2 hover:bg-blue-600 duration-150'>Añadir</button>
          </div>
        </div>
        {
          withoutProducts() &&
            <div className='absolute top-0 left-0 bg-black/25 w-full h-full flex justify-center items-center'>
              <h1 className='px-5 py-2 bg-white text-red-700 rotate-12 text-5xl font-bold'>Sin Stock</h1>
            </div>
        }
      </div>
    </fieldset>

  )
}
