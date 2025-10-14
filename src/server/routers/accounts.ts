import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { accountsTable, accountTypesTable, currenciesTable } from "~/db/schema";
import { eq, or } from "drizzle-orm";
import { AccountWithCurrencyAndType } from "~/types";
import { z } from "zod";
import { errors } from "~/errors/trpc";
import { error_messages } from "~/errors/messages";

export const accountsRouter = createTRPCRouter({
  addAccount: protectedProcedure
    .input(
      z.object({
        bankName: z.string(),
        currentBalance: z.string(),
        reference: z.string(),
        usage: z.string(),
        typeId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<AccountWithCurrencyAndType> => {
      const userId = ctx.userId!;
      const currency = await db
        .select()
        .from(currenciesTable)
        .where(eq(currenciesTable.code, "EUR"))
        .limit(1); // Hardcoded to EUR
      if (currency.length === 0) {
        throw errors.notFound(error_messages.currencyNotFound);
      }

      const accountType = input.typeId
        ? await db
            .select()
            .from(accountTypesTable)
            .where(eq(accountTypesTable.id, input.typeId))
            .limit(1)
        : await db
            .select()
            .from(accountTypesTable)
            .where(eq(accountTypesTable.slug, "private"))
            .limit(1);

      if (accountType.length === 0) {
        throw errors.notFound(error_messages.accountTypeNotFound);
      }

      const account = await db
        .insert(accountsTable)
        .values({
          userId,
          bankName: input.bankName,
          currentBalance: input.currentBalance,
          reference: input.reference,
          usage: input.usage,
          currencyId: currency[0].id,
          typeId: accountType[0].id,
        })
        .returning();

      return {
        id: account[0].id,
        bankName: account[0].bankName,
        currentBalance: account[0].currentBalance,
        reference: account[0].reference,
        usage: account[0].usage,
        currencyId: account[0].currencyId,
        currency: currency[0],
        typeId: account[0].typeId,
        type: accountType[0],
      };
    }),
  getAccounts: protectedProcedure.query(
    async ({ ctx }): Promise<AccountWithCurrencyAndType[]> => {
      const userId = ctx.userId!;
      const rows = await db
        .select({
          accounts: accountsTable,
          accountType: accountTypesTable,
          currency: currenciesTable,
        })
        .from(accountsTable)
        .where(eq(accountsTable.userId, userId))
        .innerJoin(
          accountTypesTable,
          eq(accountsTable.typeId, accountTypesTable.id),
        )
        .innerJoin(
          currenciesTable,
          eq(accountsTable.currencyId, currenciesTable.id),
        )
        .execute();

      return rows.map(({ accounts, currency, accountType }) => ({
        id: accounts.id,
        bankName: accounts.bankName,
        currentBalance: accounts.currentBalance,
        reference: accounts.reference,
        usage: accounts.usage,
        currencyId: accounts.currencyId,
        currency,
        typeId: accounts.typeId,
        type: accountType,
      }));
    },
  ),
});
