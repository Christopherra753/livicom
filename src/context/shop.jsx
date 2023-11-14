import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../constants/url'

// Crear el contexto
export const ShopContext = createContext()

// Crear el provider para proveer el contexto
export function ShopProvider ({ children }) {
  const [cart, setCart] = useState([])

  const [user, setUser] = useState(() => {
    const userFromStorage = window.localStorage.getItem('user')
    return userFromStorage ? JSON.parse(userFromStorage) : null
  })

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const data = await axios.get(`${URL}get-products`)
      setProducts(data.data)
    }
    getProducts()
  }, [])

  return (
    <ShopContext.Provider value={{
      cart,
      setCart,
      products,
      setProducts,
      user,
      setUser
    }}
    >
      {children}
    </ShopContext.Provider>
  )
}
