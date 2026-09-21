import express from "express"
import cors from "cors"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import { closeDb, warmupDb } from "./prisma.ts"


const app = express()
app.use(express.json())
app.use(cors())

// This endpoint is intentionally lightweight so an uptime monitor can verify
// that the web service is reachable without querying application data.
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        database: databaseConnected ? "ready" : "connecting",
    })
})

app.use("/api/assignments", assignmentRoutes)

const port = Number(process.env.PORT) || 3000
let server: ReturnType<typeof app.listen> | undefined
let databaseRetryTimer: ReturnType<typeof setTimeout> | undefined
let databaseConnected = false

function errorMessage(error: unknown) {
    return error instanceof Error ? error.message : String(error)
}

async function connectDatabase() {
    try {
        await warmupDb()

        if (!databaseConnected) {
            databaseConnected = true
            console.log("Database connected")
        }
    } catch (error) {
        databaseConnected = false
        console.warn(
            `Database is unavailable (${errorMessage(error)}). Retrying in 5 seconds.`
        )

        databaseRetryTimer = setTimeout(() => {
            void connectDatabase()
        }, 5_000)
    }
}

function startServer() {
    server = app.listen(port, () => {
        console.log(`Server started on port ${port}`)
        void connectDatabase()
    })
}

async function shutdown() {
    if (databaseRetryTimer) {
        clearTimeout(databaseRetryTimer)
    }

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

startServer()
