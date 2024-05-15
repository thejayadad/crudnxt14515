'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import clsx from "clsx"

const SideBarLinkItem= ({icon, label, href}) => {
    const pathname = usePathname()
    const router = useRouter()
    const onClick = () => {
        router.push(href)
    }
    const isActive = (pathname === href)
  return (  
    <button
    onClick={onClick}
    className={clsx(
        "flex items-center gap-x-2 text-sm font-[500] pl-5 transition-all",
        isActive ? "text-blue-900 bg-primary/60": "text-primary hover:text-gray-700 hover:bg-primary/60"
    )}
    >
        <div className='flex items-center gap-x-2 py-4'>
            <span
            className={clsx(icon.props.className, isActive ? "text-blue-900" : "text-gray-800")}
            >
                {icon}
            </span>
            <span
            className={isActive ? 'text-blue-900' : 'text-gray-800'}
            >
                {label}
            </span>
        </div>
        <div
            className={clsx(
                "ml-auto opacity-0 border-2 border-blue-900 h-full transition-all", isActive && 'opacity-100'
            )}
        />
    </button>
  )
}

export default SideBarLinkItem