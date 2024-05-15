'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function createTask(eventData) {
    const session = await auth()
    const user = session?.user
    const userEmail = user.email
    if(!user){
        throw new Error("User Not Found")
    }
    try {
        const {content, projectId} = eventData
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })
        if(!project){
            throw new Error("Project not found")
        }
        const newTask = await prisma.task.create({
            data: {
                content,
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        })
        return newTask
    } catch (error) {
        console.log("Create Task Error " + error)
        throw new Error("Failed to create task ")
    }
}