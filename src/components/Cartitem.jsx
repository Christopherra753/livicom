import { useContext, useEffect, useState } from 'react'
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi'
import Swal from 'sweetalert2'
import { ShopContext } from '../context/shop'

export function Cartitem ({ product, reduceStock, increaseStock, deleteProduct }) {
  const { cart } = useContext(ShopContext)

  const [amount, setAmount] = useState(product.amount)

  useEffect(() => {
    setAmount(product.amount)
  }, [cart])

  const plusAmount = () => {
    if (amount >= product.stock) return
    setAmount(amount + 1)
    increaseStock(product.id)
  }

  const minusAmount = () => {
    if (amount <= 1) return
    setAmount(amount - 1)
    reduceStock(product.id)
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Remover',
      text: `El producto '${product.name}' fue removido del carrito correctamente`,
      icon: 'success',
      timer: 1500
    })
    deleteProduct(product.id, amount)
  }

  return (
    <div className='border-b py-12 px-6 relative'>
      <div className='flex items-center gap-2 justify-between'>
        <img src={product.image} alt='product-image' className='w-36 h-36 object-contain' />
        <div className='flex flex-col gap-2'>
          <h2 className='text-right font-semibold text-base sm:text-lg md:text-xl duration-150'>{product.name}</h2>
          <p className='text-right'>S/.{product.price * amount}</p>
          <div className='flex items-center self-end border p-1'>
            <button onClick={plusAmount} className='px-2'> <BiPlus /> </button>
            <input readOnly className='w-10  px-2 py-1 text-center outline-none' type='text' value={amount} />
            <button onClick={minusAmount} className='px-2'> <BiMinus /> </button>
          </div>
        </div>
      </div>
      <button className='absolute top-2 right-2 bg-red-500 rounded-full p-2 hover:bg-red-600 duration-150' onClick={handleDelete}><BiTrash className='text-base md:text-lg lg:text-xl duration-150 text-white' /></button>
    </div>
  )
}
