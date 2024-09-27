import React from 'react'
import Searchbar from '../Searchbox/Searchbar'

const Navbar = () => {

  const lst = [];

  return (
    <div className='flex flex-row justify-between items-center py-3'>
      <Searchbar/>

      <div className='flex flex-row items-center gap-3'>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-sm font-bold'>Viraj Zuluk</p>
          <p>•</p>
          <p className='text-xs text-[#7065FF]'> Admin</p>
        </div>
        <img src='user.png' alt='profile' className='w-10 h-10 rounded-full'/>
      </div>
    </div>
  )
}

export default Navbar