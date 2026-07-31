import express from "express"
import assignmentRoutes from "./routes/assignmentRoutes.js"


const app = express()
app.use(express.json())

app.use("/api/assignments", assignmentRoutes)

app.listen(3000, () => {
    console.log("Server started on port 3000!!");
})