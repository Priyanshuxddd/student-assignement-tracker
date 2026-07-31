import { Router } from "express";
import { createAssignment, getAssignments , getAssignmentById , editAssignment } from "../controllers/assignmentControllers.js";

const router = Router()

router.post("/",createAssignment)
router.get("/",getAssignments)
router.get("/:id",getAssignmentById)
router.put("/:id",editAssignment)

export default router;