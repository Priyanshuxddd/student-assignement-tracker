import dns from "node:dns";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

dns.setDefaultResultOrder("ipv4first");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({
  connectionString,
  max: 5,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10_000,
  // pg otherwise closes idle connections after 10 seconds. Keeping a small pool
  // warm avoids reconnecting to the remote database for ordinary page refreshes.
  idleTimeoutMillis: 5 * 60_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (error) => {
  console.error("Postgres pool error", error);
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool, {
    onPoolError: (error) => {
      console.error("Postgres pool error", error);
    },
    onConnectionError: (error) => {
      console.error("Postgres connection error", error);
    },
  }),
});

export async function warmupDb() {
  await prisma.$queryRaw`SELECT 1`;
}

export async function closeDb() {
  await prisma.$disconnect();
  await pool.end();
}

export default prisma;
