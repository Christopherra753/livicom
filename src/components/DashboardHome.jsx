import { useContext } from 'react'
import { ShopContext } from '../context/shop'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { CATEGORIES } from '../constants/categories'

ChartJS.register(ArcElement, Tooltip, Legend)

export function DashboardHome () {
  const { products } = useContext(ShopContext)

  const data = {
    labels: CATEGORIES.map(category => category.description),
    datasets: [
      {
        label: 'Productos: ',
        data: CATEGORIES.map(category => {
          const totalProducts = products.filter(product => product.category === category.id).length
          return totalProducts
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='mx-auto px-4 sm:px-6 max-w-3xl lg:px-8'>
      <h1 className='text-4xl text-center font-bold text-gray-800 mb-5'>Reportes</h1>
      <Pie data={data} />
    </div>
  )
}
