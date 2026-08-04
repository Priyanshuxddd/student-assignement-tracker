import express from "express"
import cors from "cors"
import assignmentRoutes from "./routes/assignmentRoutes.js"


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/assignments", assignmentRoutes)

app.listen(3000, () => {
    console.log("Server started on port 3000!!");
})