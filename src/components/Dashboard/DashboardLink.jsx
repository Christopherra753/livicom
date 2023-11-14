import { NavLink } from 'react-router-dom'

export function DashboardLink ({ address, label, children, showMenu }) {
  return (
    <NavLink onClick={() => showMenu(false)} to={address} className='text-black flex items-center font-bold hover:bg-shop-200 hover:text-white rounded-md px-3 py-2   text-2xl gap-2 transition-colors'>
      {children}
      <span className='text-xl tracking-wider'>{label}</span>
    </NavLink>
  )
}
