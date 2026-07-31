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

export const getAssignmentById = async (req:Request, res: Response) => {
        try {

            const id = Number(req.params.id)

            if(isNaN(id)){
                return res.status(400).json({
                    message: "Invalid Assignment parameter passed!"
                })
            }

            const assignment = await prisma.assignment.findUnique({
                where: {
                    id
                }  
            }) 

            if(!assignment) {
                return res.status(404).json({
                    message: "Assignment with this id doesnt exist"
                })

            } 
                return res.status(200).json({
                    assignment
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
}

export const editAssignment = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id)

            if(isNaN(id)){
                return res.status(400).json({
                    message: "Type Valid Assignment id"
                })
            }

            // we had to did all of this bc prisma wasnt allowing the date to be a String it could be 
            // const data = req.body simply if it werent for date
            const data = {
                ...req.body,
                dueDate: req.body.dueDate
                  ? new Date(req.body.dueDate)
                  : undefined,
              };

            
            const assignment = await prisma.assignment.update({
                where: {id},
                data 
            });

            return res.status(200).json({
                message:"Assignment Updated Sucessfully",
                assignment
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:"Internal Server Error"
            })
        }
}