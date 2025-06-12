import { pgTable, integer, varchar, decimal } from "drizzle-orm/pg-core";

export const welcomeTable = pgTable("welcomes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bankName: varchar({ length: 255 }).notNull(),
  currentAmount: decimal({ precision: 10, scale: 2 }).notNull(),
  reference: varchar({ length: 255 }).notNull(),
  usage: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  createdAt: varchar({ length: 255 }).notNull(),
});
