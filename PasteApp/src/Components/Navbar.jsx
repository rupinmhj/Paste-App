import React from 'react'
import logo from "../assets/eraPaste.png"
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex gap-4  w-[100dvw] justify-between py-2 bg-gray-800 items-center px-6'>
      <img src={logo} className='h-[35px] w-[48px] bg-transparent ' alt="logo" />
      <div className="">
        <NavLink to="/"
      className={({isActive})=>isActive?"bg-white px-3 py-1 rounded ":"px-3 py-1"}
      >Home</NavLink>
      <NavLink 
      className={({isActive})=>isActive?"bg-white px-3 py-1 rounded":"px-3 py-1"}
      to="/pastes">Pastes</NavLink>
      </div>
      <div className="w-[48px]"></div>
      
    </div>
  )
}

export default Navbar
