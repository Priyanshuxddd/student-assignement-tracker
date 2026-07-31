import { Router } from "express";
import { createAssignment, getAssignments , getAssignmentById } from "../controllers/assignmentControllers.js";

const router = Router()

router.post("/",createAssignment)
router.get("/",getAssignments)
router.get("/:id",getAssignmentById)

export default router;