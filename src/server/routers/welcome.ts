import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import {
  accountsTable,
  currenciesTable,
} from "~/db/schema";
import { and, eq } from "drizzle-orm";
import { welcomeSchemaBase } from "~/schemas/welcomeSchema";

export const welcomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(welcomeSchemaBase)
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;

      // Pick any currency code you wish to default to; try USD first, fall back to any
      const [currency] = await db
        .select()
        .from(currenciesTable)
        .where(eq(currenciesTable.code, "USD"))
        .limit(1);

      const currencyId = currency?.id;
      if (!currencyId) {
        throw new Error(
          "No default currency found (expected code USD). Seed currencies first.",
        );
      }

      const result = await db
        .insert(accountsTable)
        .values({
          bankName: input.bankName,
          currentBalance: String(input.currentAmount.toFixed(2)),
          reference: input.reference,
          usage: input.usage,
          userId,
          currencyId,
        })
        .returning();

      return { success: true, account: result[0] };
    }),

  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const accounts = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.userId, userId));
    return accounts;
  }),
});
