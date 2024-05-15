import React from 'react'
import Logo from '../logo'
import SideBarLinks from './sidebar-links'

const SideBar = () => {
  return (
    <aside
    className='h-full border-r flex flex-col overflow-y-auto shadow-sm'
    >
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full'>
        <SideBarLinks />
      </div>
    </aside>
  )
}

export default SideBar