'use server'
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function deleteProject(id){
    try {
        const deletedProject = await prisma.project.delete({
            where: {id}
        })
        console.log("Project Deleted " + deletedProject)
        return deletedProject
    } catch (error) {
        console.log("Error deleting project " + error)
        throw new Error("Err: " + error.message)
    }
}