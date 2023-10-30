export function ShoppingItem ({ shop }) {
  const calculateTotal = () => {
    const total = shop.cart.reduce((total, element) => total + (element.price * element.quantity), 0)
    return total
  }

  return (
    <div className='p-3 bg-gray-100 shadow-lg'>
      <p className='flex flex-col'>
        <span className='text-base font-bold'>Comprobante:</span>
        <span className='text-xs font-semibold'>{shop.id}</span>
      </p>
      <div className='grid grid-cols-2'>
        <p className='flex flex-col'>
          <span className='text-base font-bold'>Cantidad:</span>
          <span className='text-xs font-semibold'>{shop.cart.length}</span>
        </p>
        <p className='flex flex-col'>
          <span className='text-base font-bold'>Total:</span>
          <span className='text-xs font-semibold'>S/. {calculateTotal()}</span>
        </p>
      </div>
    </div>
  )
}
