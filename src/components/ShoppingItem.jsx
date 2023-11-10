export function ShoppingItem ({ shop }) {
  const fechaOriginal = new Date(shop.sale_date)

  const formatoDeseado = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  })

  const fechaFormateada = formatoDeseado.format(fechaOriginal)

  return (
    <div className='p-3 bg-gray-100 shadow-lg'>
      <p className='flex flex-col'>
        <span className='text-base font-bold'>Comprobante:</span>
        <span className='text-xs font-semibold'>{shop.id}</span>
      </p>
      <div className='grid grid-cols-2'>
        <p className='flex flex-col'>
          <span className='text-base font-bold'>Cantidad:</span>
          <span className='text-xs font-semibold'>{shop.quantity}</span>
        </p>
        <p className='flex flex-col'>
          <span className='text-base font-bold'>Total:</span>
          <span className='text-xs font-semibold'>S/. {shop.total}</span>
        </p>
        <p className='flex flex-col'>
          <span className='text-base font-bold'>Fecha:</span>
          <span className='text-xs font-semibold'>{fechaFormateada}</span>
        </p>
      </div>
    </div>
  )
}
