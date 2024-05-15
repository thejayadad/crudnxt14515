'use client'

import React, {useState} from 'react'
import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react"
import SideBarLinks from '../sidebar/sidebar-links'

const MobileNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
    <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className='md:hidden'
            />
        </NavbarContent>
        <NavbarMenu>
            <NavbarItem className='pt-6'>
                <SideBarLinks />
            </NavbarItem>
        </NavbarMenu>
    </Navbar>
    </>
  )
}

export default MobileNav