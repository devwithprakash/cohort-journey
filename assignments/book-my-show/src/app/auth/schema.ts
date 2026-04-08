import { uuid, varchar, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar('name', { length: 90 }).notNull(),
    email: varchar('email', { length: 322 }).notNull().unique(),
    password: varchar('password', { length: 66 }),
    phone: varchar('phone', {length:15}).notNull().unique(),
    refreshToken: text('refresh_token'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updatd_at').$onUpdate(() => new Date())
});
