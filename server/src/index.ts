import express from "express"
import assignementRoutes from "./routes/assignmentRoutes.js"


const app = express()
app.use(express.json())

app.use("/api/assignments", assignementRoutes)


app.listen(3000, () => {
    console.log("Server started on port 3000!!");
})