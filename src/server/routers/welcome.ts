import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { welcomeTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { welcomeSchemaBase } from "~/schemas/welcomeSchema";

export const welcomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(welcomeSchemaBase)
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;

      const amount = Number(input.currentAmount);
      if (Number.isNaN(amount)) {
        throw new Error("Provided amount is not a valid number");
      }
      /*
      const result = await db
        .insert(welcomeTable)
        .values({
          bankName: input.bankName,
          currentAmount: amount,
          reference: input.reference,
          usage: input.usage,
          userId,
          createdAt: new Date(),
        })
        .returning(); */

      return { success: true /* account: result[0] */ };
    }),

  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const welcomes = await db
      .select()
      .from(welcomeTable)
      .where(eq(welcomeTable.userId, userId));
    return welcomes;
  }),
});
