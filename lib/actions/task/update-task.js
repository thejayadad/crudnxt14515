'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function updateTask(taskId, eventData){
    const session = await auth()
    const user = session?.user
    if(!user){
        throw new Error("User Not Found")
    }
    try {
        const {content, done} = eventData
        const updatedTask = await prisma.task.update({
            where: {id: taskId

            },
            data: {
               content, done
            }

        })
        console.log("Updated Project " + updatedTask)
        return updatedTask
    } catch (error) {
        console.log("Error Updating project " + error)
        throw new Error("Err: " + error.message)
    }
}