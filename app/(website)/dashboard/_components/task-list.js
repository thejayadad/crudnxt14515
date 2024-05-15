'use client'
import { deleteTask } from '@/lib/actions/task/delete-task'
import { updateTask } from '@/lib/actions/task/update-task'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FiTrash } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const TaskList = ({project}) => {
const [deleting, setDeleting] = useState(false)
const router = useRouter()
    const handleTaskClick = async (taskId, content, done) => {
        try {
            await updateTask(taskId, {content, done})
            toast.success("Task is updated")
            window.location.reload()
        } catch (error) {
            console.log("Error updating task " + error)
            toast.error("Failed to update Task")
        }
    }
    const handleDeleteClick = async (taskId) => {
        try {
            setDeleting(true)
            await deleteTask(taskId)
            toast.success("Deleted Task")
            router.push("/dashboard")
            setDeleting(false)
        } catch (error) {
            console.log("Error deleting " + error)
            toast.error("Error deleting task")
        }
    }


  return (
    <div>
        {project?.tasks && project.tasks.length > 0 ? (
            <ul
            className='pt-2'
            >
                {project.tasks.map((task, index) => (
                    <li
                    className='flex justify-between items-center max-w-screen-sm mx-auto'
                    key={index}
                    >
                        <div>
                          <input
                            className='mr-1'
                            type='checkbox'
                            checked={task.done}
                            onChange={() => handleTaskClick(task.id, task.content, !task.done)}
                          />
                          <span
                          style={{textDecoration: task.done ? 'line-through' : 'none'}}
                          >
                            {task.content}
                          </span>
                          {
                            task.done && (
                                <span
                                role='img' aria-label='check-mark' style={{marginLeft: '5px'}}
                                >

                                </span>
                            )
                          }
                        </div>
                        <FiTrash
                        size={12}
                        onClick={() => handleDeleteClick(task.id)}
                        color={deleting ? '#ccc' : '#000'}
                        />
                    </li>
                ))}

            </ul>
        ) :
            (
                <>
                    <p className='pt-4 '>
                    No Task avaiable for this project
                    </p>
                </>
            )
        }
    </div>
  )
}

export default TaskList