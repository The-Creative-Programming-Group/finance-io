import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../../db';
import { welcomeTable } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const welcomeRouter = router({
  create: publicProcedure
    .input(
      z.object({
        bankName: z.string().min(1, 'Bank name is required'),
        currentAmount: z.coerce
          .number({ invalid_type_error: 'Amount must be numeric' })
          .positive('Amount must be positive'),
        reference: z.string().min(1, 'Reference is required'),
        usage: z.string().min(1, 'Usage is required'),
        userId: z.string().min(1, 'User ID is required'),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await db.insert(welcomeTable).values({
          bankName: input.bankName,
          currentAmount: input.currentAmount,
          reference: input.reference,
          usage: input.usage,
          userId: input.userId,
          createdAt: new Date().toISOString(),
        }).returning();

        return { success: true, account: result[0] };
      } catch (error) {
        // Keep this for debugging if something goes wrong
        console.error('Database error:', error);
        throw new Error('Failed to create account');
      }
    }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const welcomes = await db.select().from(welcomeTable).where(eq(welcomeTable.userId, input.userId));
      return welcomes;
    }),
});