'use client'
import Link from 'next/link'
import React, {useState} from 'react'
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { updateProject } from '@/lib/actions/project/update-project'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Input } from '@nextui-org/react'
import { deleteProject } from '@/lib/actions/project/delete-project'

const schema = yup.object().shape({
    name: yup.string().required("Project name is required")
})

const UpdateProjectNameForm = ({project}) => {
    const {control, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: project.name
        }
    }) 
    const [isEditing, setIsEditing]= useState(false)
    const [deleting, setDeleting] = useState(false)

    const toggleEdit = () => {
        setIsEditing((current) => !current)
        reset({name: project.name})
    }
    const onSubmit = async (data) => {
        try {
            await updateProject(project.id, {...data})
            toast.success("Project Has been Updated")
            setIsEditing(false)
            window.location.href = '/dashboard'
        } catch (error) {
            console.log("Failed to update project")
            toast.error("Failed to update project")            
        }
    }

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await deleteProject(project.id)
            toast.success("Project Deleted")
            window.location.href = "/dashboard"
        } catch (error) {
            console.log("Failed to delete" + error)
            toast.error("Failed to delete")
            
        } finally {
            setDeleting(false)
        }
    }
  return (
    <nav className='w-full'>
        <div className='flex items-center justify-between'>
            <Link
            href={'/dashboard'}
            className='flex items-center gap-2'
            >
                <FiArrowLeft className='h-4 w-4' /> Back            
            </Link>
            {isEditing ? (
                <form
                className='flex'
                onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                    name='name'
                    control={control}
                    render={({field}) => (
                        <Input
                        {...field}
                        placeholder='Enter Project Name'
                        error={errors.name?.message}
                        />
                    )}
                    />  
                    <Button type='submit' disabled={false}>
                        Update
                    </Button>
                    <Button variant='light' onClick={toggleEdit}>
                        Cancel
                    </Button>
                </form>
            ) : (
                <>
                <div className='flex items-center'>
                {project.name}
                <Button variant='light' onClick={toggleEdit}>
                    <FiEdit2 className='h-4 w-4 text-yellow-400' />
                </Button>
                </div>
                
                </>
            )
        
        } 
           <Button
           onClick={handleDelete}
           disabled={deleting}
           variant='light'
           >
            {deleting ? 'Deleting...' : <FiTrash2 />}
           </Button>
        </div>
        <Toaster />
    </nav>
  )
}

export default UpdateProjectNameForm