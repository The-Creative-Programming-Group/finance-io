import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { accountsTable, categoriesTable, transactionsTable } from "~/db/schema";
import { eq, gte, lte, and } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { TransactionWithCategoryAndAccount } from "~/types";
import { z } from "zod";
import { errors } from "~/errors/trpc";
import { error_messages } from "~/errors/messages";

export const transactionsRouter = createTRPCRouter({
  addTransaction: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
        company: z.string(),
        amount: z.string(),
        datetime: z.date(),
        description: z.string().optional(),
        accountId: z.string(),
      }),
    )
    .mutation(
      async ({ ctx, input }): Promise<TransactionWithCategoryAndAccount> => {
        // Validate account ownership
        const account = await db
          .select({ id: accountsTable.id })
          .from(accountsTable)
          .where(
            and(
              eq(accountsTable.id, input.accountId),
              eq(accountsTable.userId, ctx.userId!),
            ),
          )
          .limit(1);

        if (account.length === 0) {
          throw errors.forbidden(error_messages.accountNotOwned);
        }

        const transaction = await db
          .insert(transactionsTable)
          .values({
            categoryId: input.categoryId,
            company: input.company,
            amount: input.amount,
            datetime: input.datetime,
            description: input.description || "",
            accountId: input.accountId,
          })
          .returning();

        const transactionWithCategoryAndAccount = await db
          .select({
            transactions: transactionsTable,
            categories: categoriesTable,
            accounts: accountsTable,
          })
          .from(transactionsTable)
          .innerJoin(
            accountsTable,
            eq(transactionsTable.accountId, accountsTable.id),
          )
          .innerJoin(
            categoriesTable,
            eq(transactionsTable.categoryId, categoriesTable.id),
          )
          .where(
            and(
              eq(transactionsTable.id, transaction[0].id),
              eq(accountsTable.userId, ctx.userId!),
            ),
          )
          .limit(1)
          .execute();

        const row = transactionWithCategoryAndAccount[0];

        if (!row) {
          throw errors.notFound(error_messages.transactionNotFound);
        }

        return {
          ...row.transactions,
          category: row.categories,
          account: row.accounts,
        };
      },
    ),
  getTransactions: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        categoryId: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(
      async ({ ctx, input }): Promise<TransactionWithCategoryAndAccount[]> => {
        if (input.accountId) {
          const owned = await db
            .select({ id: accountsTable.id })
            .from(accountsTable)
            .where(
              and(
                eq(accountsTable.id, input.accountId),
                eq(accountsTable.userId, ctx.userId!),
              ),
            )
            .limit(1);
          if (owned.length === 0) {
            throw errors.forbidden(error_messages.accountNotOwned);
          }
        }

        // Always restrict to the current user's accounts
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
          input.endDate
            ? lte(transactionsTable.datetime, input.endDate)
            : undefined,
        ];
        const typed = conditions.filter((c): c is SQL => Boolean(c));
        const whereExpr: SQL | undefined = typed.length
          ? and(...typed)
          : undefined;

        const qb = db
          .select({
            transactions: transactionsTable,
            categories: categoriesTable,
            accounts: accountsTable,
          })
          .from(transactionsTable)
          .innerJoin(
            accountsTable,
            eq(transactionsTable.accountId, accountsTable.id),
          )
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
      },
    ),
});
