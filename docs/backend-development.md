## Backend Development Guide

This guide documents how we build backend features in this repository to ensure consistency, type-safety, and security.

### Tech Stack and Principles

- **Runtime**: Node/TypeScript with strict typing. Avoid `any`.
- **API**: tRPC routers under `src/server/routers` using `protectedProcedure`.
- **ORM**: Drizzle ORM with PostgreSQL; schema in `src/db/schema.ts`.
- **Validation**: Zod (`import { z } from "zod"`).
- **Errors**: TRPCError helpers in `src/errors/trpc.ts` and message keys in `src/errors/messages.ts`.
- **Types**: Shared API-facing types in `src/types/index.ts`.

### Directory Layout

- `src/server/routers/*`: One router per domain (e.g., `accounts.ts`, `transactions.ts`).
- `src/server/api/*`: tRPC setup (`trpc.ts`, `root.ts`).
- `src/db/*`: Drizzle DB client and schema.
- `src/errors/*`: Error helpers and message keys.
- `src/types/*`: Shared TypeScript interfaces for API responses.
- `drizzle/*`: SQL migrations and snapshot metadata.

### Authentication and Authorization

- **Always use `protectedProcedure`** for endpoints that require a logged-in user; access the user via `ctx.userId`.
- **Never trust client-provided user IDs**. Filter by `ctx.userId` on the server.
- **Ownership checks are mandatory** for any resource scoped to a user.
  - Example: Before creating a `transaction` for an `account`, verify that `account.userId === ctx.userId`.
  - Example: When listing transactions, always restrict results to accounts owned by the current user.

### Error Handling Conventions

- Use the error factory in `src/errors/trpc.ts` to throw typed errors (e.g., `errors.forbidden(...)`).
- **Do not hardcode strings**. Use `src/errors/messages.ts` for error message keys.
- **Message values are camelCase** and represent i18n keys, e.g., `currencyNotFound`, `accountNotOwned`.
- Prefer reusing generic keys where possible (`forbidden`, `notFound`, `badRequest`). Add new keys when necessary.

### Drizzle ORM Guidelines

- Import comparison helpers from `drizzle-orm`: `eq`, `gte`, `lte`, `and`.
- Prefer typed selects with aliases:
  - Use `select({ transactions: transactionsTable, categories: categoriesTable, accounts: accountsTable })`.
  - Use `innerJoin` when related rows must exist; use `leftJoin` only when nulls are expected.
- Compose filters using a single `where` expression (build an `and(...)` chain) instead of mutating the builder repeatedly.
- For conditional filtering, build a `whereExpr` (`SQL | undefined`) and apply it once: `const rows = whereExpr ? await qb.where(whereExpr).execute() : await qb.execute()`.

### Date/Time and Numeric Types

- Use `timestamp({ withTimezone: true })` in schema; pass and compare as `Date` objects in code.
- Use `gte`/`lte` with `Date` values (not milliseconds). Example: `gte(transactionsTable.datetime, input.startDate)`.
- For currency amounts, use Drizzle `decimal({ precision, scale, mode: "string" })` and handle values as strings at the API boundary to avoid floating-point issues.

### Zod Validation Patterns

- Import with `import { z } from "zod"`.
- Validate timestamps as `z.date()`.
- Validate amounts as `z.string()` (paired with `decimal(..., mode: "string")`).
- Optional fields use `.optional()`; keep inputs minimal and explicit.

### Types and Response Shapes

- Use `src/types/index.ts` interfaces for API responses (e.g., `AccountWithCurrencyAndType`, `TransactionWithCategoryAndAccount`).
- Build responses by mapping typed Drizzle rows to these interfaces. Avoid returning raw Drizzle shapes if they do not match the shared types.
- Avoid `any`, `unknown`, and explicit `PgSelectBase` casts. Let Drizzle infer types via `select({ ... })` with aliases.

### Ownership Enforcement Patterns

- Create operations (example: transactions):
  - First, verify ownership of the parent resource via Drizzle `select` on the owner table (e.g., `accountsTable.userId === ctx.userId`).
  - If not owned, throw `errors.forbidden(error_messages.accountNotOwned)`.
- Read/List operations:
  - Scope always results by joining the owner table first and applying `where(eq(ownerTable.userId, ctx.userId))`.
  - If the client passes an ID filter (e.g., `accountId`), optionally pre-validate ownership and throw `forbidden` if not owned.

### Example: Secure and Typed List Query

```ts
import type { SQL } from "drizzle-orm";
const conditions: (SQL | undefined)[] = [
  eq(accountsTable.userId, ctx.userId!),
  input.accountId
    ? eq(transactionsTable.accountId, input.accountId)
    : undefined,
  input.categoryId
    ? eq(transactionsTable.categoryId, input.categoryId)
    : undefined,
  input.startDate
    ? gte(transactionsTable.datetime, input.startDate)
    : undefined,
  input.endDate ? lte(transactionsTable.datetime, input.endDate) : undefined,
];
const typed = conditions.filter((c): c is SQL => Boolean(c));
const whereExpr = typed.length ? and(...typed) : undefined;

const qb = db
  .select({
    transactions: transactionsTable,
    categories: categoriesTable,
    accounts: accountsTable,
  })
  .from(transactionsTable)
  .innerJoin(accountsTable, eq(transactionsTable.accountId, accountsTable.id))
  .innerJoin(
    categoriesTable,
    eq(transactionsTable.categoryId, categoriesTable.id),
  );

const rows = whereExpr
  ? await qb.where(whereExpr).execute()
  : await qb.execute();
return rows.map((row) => ({
  ...row.transactions,
  category: row.categories,
  account: row.accounts,
}));
```

### Error Messages (i18n-ready)

- Add new keys to `src/errors/messages.ts` with camelCase values, e.g.:
  - `currencyNotFound`, `accountTypeNotFound`, `accountNotOwned`, `transactionNotFound`.
- UI will translate these keys later via i18n; backend should only emit the keys.

### Router Conventions

- Name operations clearly: `addX` for create, `getX` for list, `updateX`, `deleteX` if needed.
- Keep each router focused on a single domain, and register it in `src/server/api/root.ts`.
- Inputs: Zod schemas colocated in the procedure.
- Outputs: Typed return values using shared interfaces.

### Migrations and Seeding

- Manage schema changes with Drizzle migrations in `drizzle/`.
- Keep `src/scripts/seed.ts` aligned with current schema and business rules (ownership, required fields).
- Prefer deterministic seeds for development.

### Linting and Quality

- No `any` in production code. Let types flow from Drizzle and Zod.
- Keep functions small and focused. Use early returns.
- Avoid catching errors unless adding meaningful handling or mapping to typed TRPC errors.

### Adding a New Feature (Checklist)

- Define/extend schema in `src/db/schema.ts` and generate a migration.
- Add router or extend existing one under `src/server/routers`.
- Validate inputs with Zod; enforce ownership with Drizzle where applicable.
- Use `errors` + `error_messages` for failures (camelCase message keys).
- Return typed responses using `src/types/index.ts`.
- Add seeds/tests if relevant.
