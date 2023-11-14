import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shop'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Title } from '../Layout/Title'
import axios from 'axios'
import { URL } from '../constants/url'

ChartJS.register(ArcElement, Tooltip, Legend)

export function DashboardHome () {
  const { products } = useContext(ShopContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const data = await axios.get(`${URL}get-categories`)
      setCategories(data.data)
    }
    getCategories()
  }, [])

  const data = {
    labels: categories.map(category => category.name),
    datasets: [
      {
        label: 'Productos: ',
        data: categories.map(category => {
          const totalProducts = products.filter(product => product.category_id === category.id).length
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
    <div className=''>
      <Title name='Reportes' />
      <div className='w-96 h-96 mx-auto'>
        <p className='text-center text-gray-700 font-semibold'>Relacion de la cantidad de productos por categoria</p>
        <Pie className='' data={data} />
      </div>
    </div>
  )
}
