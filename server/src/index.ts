import express from "express"
import cors from "cors"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import { closeDb, warmupDb } from "./prisma.ts"


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/assignments", assignmentRoutes)

const port = 3000
let server: ReturnType<typeof app.listen> | undefined

async function startServer() {
    try {
        await warmupDb()
        server = app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (error) {
        console.error("Could not connect to the database", error);
        process.exitCode = 1
    }
}

async function shutdown() {
    if (!server) {
        await closeDb()
        return
    }

    server.close(async (error) => {
        try {
            await closeDb()
        } finally {
            process.exit(error ? 1 : 0)
        }
    })
}

process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)

void startServer()
