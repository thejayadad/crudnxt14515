'use server'
import prisma from "@/lib/prisma"

export async function deleteTask(id){
    try {
        const deletedTask = await prisma.task.delete({
            where: {id}
        })
        console.log("Task Deleted " + deletedTask)
        return deletedTask
    } catch (error) {
        console.log("Error deleting task " + error)
        throw new Error("Err: " + error.message)
    }
}