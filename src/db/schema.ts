import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  timestamp,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

// Users (Clerk user id as a primary key)
export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
});

// Currencies
export const currenciesTable = pgTable(
  "currencies",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    code: varchar({ length: 10 }).notNull(), // e.g. USD, EUR, ARS
  },
  (table) => ({
    codeUniqueIdx: uniqueIndex("currencies_code_unique_idx").on(table.code),
  }),
);

// Categories
export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 120 }).notNull(),
  },
  (table) => ({
    slugUniqueIdx: uniqueIndex("categories_slug_unique_idx").on(table.slug),
  }),
);

export const references = ["private", "business", "savings", "shared"] as const;

export const referencesEnum = pgEnum("references", references);

// Accounts
export const accountsTable = pgTable(
  "accounts",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: varchar({ length: 255 })
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    bankName: varchar({ length: 255 }).notNull(),
    // Use high-precision decimal stored as string in code to prevent JS float issues
    currentBalance: decimal({
      precision: 18,
      scale: 2,
      mode: "string",
    }).notNull(),
    reference: referencesEnum().notNull(),
    usage: varchar({ length: 255 }).notNull(),
    currencyId: uuid()
      .notNull()
      .references(() => currenciesTable.id, { onDelete: "restrict" }),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("accounts_user_idx").on(table.userId),
    currencyIdx: index("accounts_currency_idx").on(table.currencyId),
  }),
);

// Transactions
export const transactionsTable = pgTable(
  "transactions",
  {
    id: uuid().defaultRandom().primaryKey(),
    accountId: uuid()
      .notNull()
      .references(() => accountsTable.id, { onDelete: "cascade" }),
    categoryId: uuid()
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "restrict" }),
    company: varchar({ length: 255 }).notNull(),
    amount: decimal({ precision: 18, scale: 2, mode: "string" }).notNull(),
    datetime: timestamp({ withTimezone: true }).notNull(),
    description: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    accountIdx: index("transactions_account_idx").on(table.accountId),
    categoryIdx: index("transactions_category_idx").on(table.categoryId),
    datetimeIdx: index("transactions_datetime_idx").on(table.datetime),
  }),
);
