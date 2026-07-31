import { Router } from "express";
import { createAssignment, getAssignments } from "../controllers/assignmentControllers.js";

const router = Router()

router.post("/",createAssignment)
router.get("/",getAssignments)


export default router;