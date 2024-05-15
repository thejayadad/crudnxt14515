'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button, Input, Textarea } from '@nextui-org/react'
import { createTask } from '@/lib/actions/task/create-task'


const schema = yup.object().shape({
    content: yup.string().required("Task Content required")
})


const AddTaskForm = ({projectId}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })
    const router = useRouter()
    const onSubmit = async (data) => {
        try {
            await createTask({...data, projectId})
            toast.success("Task Created Successfully")
            router.push("/dashboard")
        } catch (error) {   
            console.log("Error Creating task" + error)
            toast.error("Failed to creae task")
        }
    }
  return (
    <div>
        <h1 className='font-bold'>Add Task</h1>
        <form
        className='mx-auto max-w-screen-sm'
        onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register('content')}
                placeholder='Task...'
                error={errors.content?.message}
            />
            <input hidden name='projectId' defaultValue={projectId} ref={register()} />
            <Button
            type='submit'
            >
                Add Task
            </Button>
        </form>
        <Toaster />
    </div>
  )
}

export default AddTaskForm