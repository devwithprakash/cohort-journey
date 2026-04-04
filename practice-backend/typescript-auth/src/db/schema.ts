import {pgTable, uuid, varchar, text, timestamp} from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(), // id is primary and can be assign random
    firstName: varchar('first_name', {length: 45}).notNull(), // notNull = required
    lastName: varchar('last_name', {length: 45}),
    email: varchar('email', {length: 322}).notNull().unique(),
    password: varchar('password', {length: 66}),
    salt: text('salt'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(()=> new Date())

})

// ORM - JS (cammelCase) | DB - snake_case