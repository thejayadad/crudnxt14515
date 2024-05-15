import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import UpdateProjectNameForm from '../../_components/update-project-name-form'
import UpdateProjectItem from '../../_components/project-page/update-project-items'
import AddTaskForm from '../../_components/form/add-task-form'
import TaskList from '../../_components/task-list'

const ProjectPage = async ({params}) => {
    const postId = params.id
    const session = await auth()
    const user = session?.user
    const project = await prisma.project.findUnique({
        where: {
            id: postId
        },
        include: {
            tasks: true
        }
    })
    if(!project){
        return redirect("/dashboard")
    }
  return (
    <section className='pt-12 px-4 space-y-4'>
        <div>
            <div className='flex justify-between items-center'>
                <UpdateProjectNameForm
                    project={project}
                />  
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <UpdateProjectItem
                project={project}
                />
            </div>
            <div>
                <div className='flex flex-col'>
                    <AddTaskForm
                    projectId={project.id}
                    />
                    <TaskList project={project} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProjectPage