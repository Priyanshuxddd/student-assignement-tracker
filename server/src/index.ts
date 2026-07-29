import express from "express"
import prisma from "./prisma.js";


const app = express()
app.use(express.json())


app.get('/test-db', async(req,res) => {
    const users= await prisma.user.findMany()
    res.status(200).json(users)
})


app.listen(3000, () => {
    console.log("Server started on port 3000!!");
})