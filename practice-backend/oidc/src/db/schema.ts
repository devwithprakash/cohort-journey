import { pgTable, uuid, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    first_name: varchar("first_name", { length: 25 }),
    last_name: varchar("last_name", { length: 25 }),

    email: varchar("email", { length: 322 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),

    password: varchar("password", { length: 66 }),
    salt: text("salt"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})