'use client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { updateProject } from '@/lib/actions/project/update-project'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import ColorPicker from '../form/color-picker'



const schema = yup.object().shape({
    name: yup.string().required("Project name is required"),
    notes: yup.string()
})
const UpdateProjectItem = ({project}) => {
    const {control, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: project.name,
            notes: project.notes
        }
    }) 
    const [selectedColor, setSelectedColor] = useState(project.color)
    const [selectedPriority, setSelectedPriority] = useState(project.priority)
    const [updating, setUpdating] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setSelectedPriority(project.priority)

    }, [project.priority])
    const onSelectColor = (color) => {
        setSelectedColor(color)
    }
    const handlePriority = (priority) => {
        setSelectedPriority(priority)
    }
    const onSubmit = async (data) => {
        try {
            setUpdating(true)
            await updateProject(project.id, {...data, priority: selectedPriority, color: selectedColor})
            toast.success("Project updated")
            router.push("/dashboard")
        } catch (error){
            console.log("Error " + error)
            toast.error("Failed to update")
        } finally{
            setUpdating(false)
        }
    }
  return (
    <div className='flex flex-col gap-8 p-2'>
        <h2 className='font-bold'>Update Your Project</h2>
        <div>
            <form
            className='flex flex-col gap-6'
            onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <span>Project Notes</span>
                <Textarea
                    name="notes"
                    control={control}
                    defaultValue={project.notes}
                    error={errors.notes?.message}
                />
                </div>
                <div>
                <span>Project Color</span>
                <ColorPicker defaultValue={selectedColor} onSelectColor={onSelectColor} />
                </div>
                <div className='flex space-x-4'>
                    <Button
                    onClick={() => handlePriority('low')} 
                    disabled={updating}
                    className={`w-full ${selectedPriority === 'low' ? 'bg-primary text-white': 'bg-light'} 
                    ${updating ? 'disabled' : ''}
                    `}
                    >
                        Low
                    </Button>
                    <Button
                    onClick={() => handlePriority('medium')} 
                    disabled={updating}
                    className={`w-full ${selectedPriority === 'medium' ? 'bg-success text-white': 'bg-light'} 
                    ${updating ? 'disabled' : ''}
                    `}
                    >
                        Medium
                    </Button>
                    <Button
                    onClick={() => handlePriority('high')} 
                    disabled={updating}
                    className={`w-full ${selectedPriority === 'high' ? 'bg-warning text-white': 'bg-light'} 
                    ${updating ? 'disabled' : ''}
                    `}
                    >
                        High
                    </Button>
                </div>
                <Button
                color='primary'
                type='submit'
                disabled={updating}
                >
                    {updating ? 'Updating...' : 'Update'}
                </Button>
            </form>
            <Toaster />
        </div>
    </div>
  )
}

export default UpdateProjectItem