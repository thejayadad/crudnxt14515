import { auth, signIn } from '@/auth'
import { Button } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import React from 'react'

const HomePage = async () => {
  const session = await auth()
  const user = session?.user
  if(user){
    redirect("/dashboard")
  }
  return (
    <section>
      {user ?
      <>
      Welcome
      </>  
      :
      <>
      <div className='flex flex-col h-screen justify-center items-center'>
        <SignInButton />
      </div>
      </>
    }
    </section>
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
      type='submit'
      >
        SignIn
      </Button>
    </form>
  )
}

export default HomePage