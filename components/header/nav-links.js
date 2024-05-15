import { auth, signIn, signOut } from '@/auth'
import React from 'react'
import ThemeToggle from './theme-toggle'
import { Button } from '@nextui-org/react'
import { FiLogOut, FiUser } from 'react-icons/fi'

const NavLinks = async () => {
    const session = await auth()
    const user = session?.user

  return (
    <div className='flex ml-auto items-center'>
        <ThemeToggle />
        {user ? <LogoutButton /> : <SignInButton />}
    </div>
  )
}

function SignInButton(){
    return (
        <form
        action={async () => {
            'use server'
            await signIn()
        }}
        >
            <Button
            variant='light'
            type='submit'>
                <FiUser />
            </Button>
        </form>
    )
}

function LogoutButton(){
    return(
        <form
        action={async () => {
            'use server'
            await signOut()
        }}
        >
            <Button
            type='submit'
            variant='light'
            >
                <FiLogOut />
            </Button>
        </form>
    )
}
export default NavLinks