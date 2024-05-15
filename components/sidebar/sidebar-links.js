'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { FiHome, FiPlus } from 'react-icons/fi'
import SideBarLinkItem from './sidebar-link-item'


const siteLinks = [
    {
        icon: <FiHome />,
        label: "Home",
        href: "/dashboard"
    },
    {
        icon: <FiPlus />,
        label: "New",
        href: "/dashboard/new"
    }
]

const SideBarLinks = () => {
    const pathname = usePathname()
    const routes = siteLinks
  return (
    <div className='flex flex-col w-full'>
        {routes.map(route => (
            <SideBarLinkItem
            icon={route.icon}
            href={route.href}
            label={route.label}
            key={route.href}
            />
        ))}        
    </div>
  )
}

export default SideBarLinks