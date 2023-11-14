import { NavLink } from 'react-router-dom'

export function MenuLink ({ address, label, setShowMenu }) {
  return (
    <li className='text-center'>
      <NavLink onClick={() => setShowMenu(false)} to={address} className='text-xl sm:text-2xl md:text-xl md:text-shop-200 block px-4 py-4 md:py-2 hover:bg-shop-100/70 font-bold md:font-semibold md:rounded-lg tracking-wider md:tracking-normal transition-colors  md:hover:bg-shop-300/50'>
        {label}
      </NavLink>
    </li>
  )
}
