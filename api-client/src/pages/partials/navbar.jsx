import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-between items-center py-4'>
        <h1 className='text-indigo font-bold text-2xl'>GABSON</h1>
        <div className='flex gap-10 font-semibold'>
            <NavLink className={'px-5 py-1 rounded'} to={'/'} >Categories</NavLink>
            <NavLink className={'px-5 py-1 rounded'} to={'/create-category'} >Parent</NavLink>
            <NavLink className={'px-5 py-1 rounded'} to={'/documentation'} >Docs</NavLink>
        </div>
    </div>
  )
}

export default Navbar