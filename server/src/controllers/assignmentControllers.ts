
import prisma from "../prisma.js";
import type { Request, Response } from "express";

export const createAssignment = async (req: Request , res: Response) => {
        console.log("Reached controller");
        
 
    try {   
        const {title, description , dueDate , userId} = req.body;
            
        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                dueDate : new Date(dueDate),
                userId
            }
        })

        res.status(201).json({
            message: "Assignment created",
            assignment
        })
    }    catch (error){
            res.status(500).json({
                message : "Something went wrong",
                error
            })
    }

}

export const getAssignments = async (req: Request, res: Response) => {

    try {
        const assignments = await prisma.assignment.findMany()
        return res.status(200).json({
            assignments,
        }) 

        } catch(error){
        return res.status(500).json({
                message: "Couldntfetch Assignments"
            })
    }
    
}