'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button, Input, Textarea } from '@nextui-org/react'
import { createProject } from '@/lib/actions/project/create-project'
import ColorPicker from './color-picker'

const schema = yup.object().shape({
    name: yup.string().required("Project name required")
})

const NewProjectForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [selectedColor, setSelectedColor]= React.useState('')
    const [priority, setPriority] = React.useState('')

        const onSelectColor = (color) => {
            setSelectedColor(color)
        }
        const handlePriority = (value) => {
            setPriority(value)
        }
        const onSubmit = async (data) => {
            setLoading(true)
            try {
                await createProject({...data, color: selectedColor, priority})
                toast.success("Project Created Successfully")
                router.push("/dashboard")
            } catch (error) {
                toast.error("Failed to create project")
            } finally {
                setLoading(false)
                reset()
            }
        }
  return (
    <section className='p-6'>
        <div>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-screen-md mx-auto'
            >
                <span>What is the name of your project?</span>
                <Input 
                placeholder='Name...'
                className='pt-2'
                {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <div className='pt-8'>
                    <span className='mb-4'>Select A Color To Organize Your Project</span>
                    <div className='bg-slate-100 p-2 shadow-sm border rounded-lg'>
                        <ColorPicker onSelectColor={onSelectColor} />
                    </div>
                    <div className='pt-8 pb-8'>
                        <span className='mb-4'>Select The Project Priority</span>
                        <div className='flex items-center space-x-4'>
                            <Button
                            className='w-full'
                            ghost
                            color='primary'
                            onClick={() => handlePriority('Low')}
                            >
                                Low
                            </Button>
                            <Button
                            className='w-full'
                            ghost
                            color='success'
                            onClick={() => handlePriority('Medium')}
                            >
                                Medium
                            </Button>
                            <Button
                            className='w-full'
                            ghost
                            color='warning'
                            onClick={() => handlePriority('High')}
                            >
                                High
                            </Button>
                        </div>
                    </div>
                    <div className='pt-8pb-8'>
                        <span className='mb-4'>Add Project Notes</span>
                        <Textarea
                            placeholder='Notes...'
                            {...register('notes')}
                        />
                    </div>
                </div>
                <Button
                type='submit'
                className='mt-4 w-full'
                loading={loading}
                >
                    {loading ? 'Creating...' : 'Create Project'}
                </Button>
            </form>
        </div>
    </section>
  )
}

export default NewProjectForm