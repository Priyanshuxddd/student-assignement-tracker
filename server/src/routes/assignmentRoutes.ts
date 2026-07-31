import { Router } from "express";
import { createAssignment, getAssignments , getAssignmentById , editAssignment , deleteAssignment} from "../controllers/assignmentControllers.js";

const router = Router()

router.post("/",createAssignment)
router.get("/",getAssignments)
router.get("/:id",getAssignmentById)
router.put("/:id",editAssignment)
router.delete("/:id",deleteAssignment)

export default router;