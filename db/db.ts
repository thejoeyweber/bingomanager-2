/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import { profilesTable } from "@/db/schema" // removed todos import
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env.local" })

const schema = {
  profiles: profilesTable
  // removed: todos: todosTable
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })
