import express from "express"
import cors from "cors"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import prisma from "./prisma.js"


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/assignments", assignmentRoutes)

app.listen(3000, async () => {
    try {
        await prisma.$connect()
        console.log("Server started on port 3000!!");
    } catch (error) {
        console.error("Could not connect to the database", error);
    }
})