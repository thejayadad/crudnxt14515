'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function updateProject(projectId, eventData){
    const session = await auth()
    const user = session?.user
    const userEmail = user.email
    if(!user){
        throw new Error("User Not Found")
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email: userEmail}
        })
        if(!existingUser){
            throw new Error("User Not Found")
        }
        const {name, color, notes, priority} = eventData
        const updatedProject = await prisma.project.update({
            where: {id: projectId

            },
            data: {
                name, color, notes, priority,
                createdBy: {connect: {email: userEmail}}
            }

        })
        console.log("Updated Project " + updatedProject)
        return updatedProject
    } catch (error) {
        console.log("Error Updating project " + error)
        throw new Error("Err: " + error.message)
    }
}