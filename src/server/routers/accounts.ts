import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { accountsTable, currenciesTable, usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Account, AccountWithCurrency } from "~/types";
import { z } from "zod";
import { errors } from "~/errors/trpc";
import { error_messages } from "~/errors/messages";
import { referencesEnum } from "~/schemas/welcomeSchema";

export const accountsRouter = createTRPCRouter({
  addAccount: protectedProcedure
    .input(
      z.object({
        bankName: z.string(),
        currentBalance: z.string(),
        reference: referencesEnum,
        usage: z.string(),
        typeId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<AccountWithCurrency> => {
      const userId = ctx.userId;

      // First, ensure the user exists in the database
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1);

      if (existingUser.length === 0) {
        // Create the user if they don't exist
        await db.insert(usersTable).values({
          id: userId,
          // Add any other required user fields here
        });
      }

      const currency = await db
        .select()
        .from(currenciesTable)
        .where(eq(currenciesTable.code, "EUR"))
        .limit(1);

      if (currency.length === 0) {
        throw errors.notFound(error_messages.currencyNotFound);
      }

      let account: Account[] = [];

      try {
        account = await db
          .insert(accountsTable)
          .values({
            userId,
            bankName: input.bankName,
            currentBalance: input.currentBalance,
            reference: input.reference,
            usage: input.usage,
            currencyId: currency[0].id,
          })
          .returning();
      } catch (e) {
        console.error("Error inserting account:", e);
        throw errors.internal("Failed to create account");
      }

      return {
        id: account[0].id,
        bankName: account[0].bankName,
        currentBalance: account[0].currentBalance,
        reference: account[0].reference,
        usage: account[0].usage,
        currencyId: account[0].currencyId,
        currency: currency[0],
      };
    }),
  getAccounts: protectedProcedure.query(
    async ({ ctx }): Promise<AccountWithCurrency[]> => {
      const userId = ctx.userId;
      const rows = await db
        .select({
          accounts: accountsTable,
          currency: currenciesTable,
        })
        .from(accountsTable)
        .where(eq(accountsTable.userId, userId))
        .innerJoin(
          currenciesTable,
          eq(accountsTable.currencyId, currenciesTable.id),
        )
        .execute();

      return rows.map(({ accounts, currency }) => ({
        id: accounts.id,
        bankName: accounts.bankName,
        currentBalance: accounts.currentBalance,
        reference: accounts.reference,
        usage: accounts.usage,
        currencyId: accounts.currencyId,
        currency,
      }));
    },
  ),
});
