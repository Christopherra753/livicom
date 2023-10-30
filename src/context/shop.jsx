import { createContext, useState } from 'react'
import { PRODUCTS } from '../constants/products'
import { USERS } from '../constants/users'

// Crear el contexto
export const ShopContext = createContext()

// Crear el provider para proveer el contexto
export function ShopProvider ({ children }) {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState(PRODUCTS)
  const [users, setUsers] = useState(USERS)
  const [user, setUser] = useState()
  const [shopping, setShopping] = useState([])

  const filterShopping = (id) => {
    return shopping.filter(element => element.user.id === id)
  }

  return (
    <ShopContext.Provider value={{
      cart,
      setCart,
      products,
      setProducts,
      user,
      setUser,
      users,
      setUsers,
      shopping,
      setShopping,
      filterShopping
    }}
    >
      {children}
    </ShopContext.Provider>
  )
}
