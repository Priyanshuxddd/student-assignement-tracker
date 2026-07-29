import { Router } from "express";
import { createAssignment } from "../controllers/assignmentControllers.js";

const router = Router()

router.post("/",createAssignment)



export default router;