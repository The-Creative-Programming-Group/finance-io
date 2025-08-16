import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "../../db";
import { welcomeTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export const welcomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        bankName: z.string().min(1, "Bank name is required"),
        currentAmount: z.coerce
          .number({ invalid_type_error: "Amount must be numeric" })
          .positive("Amount must be positive"),
        reference: z.string().min(1, "Reference is required"),
        usage: z.string().min(1, "Usage is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;

      const amount = Number(input.currentAmount);
      if (Number.isNaN(amount)) {
        throw new Error("Provided amount is not a valid number");
      }

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
        .returning();

      return { success: true, account: result[0] };
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
