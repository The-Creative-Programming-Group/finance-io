import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { ClerkUser } from "~/types";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }): Promise<ClerkUser> => {
    const userId = ctx.userId;
    const user = ctx.user;

    await db.insert(usersTable).values({ id: userId }).onConflictDoNothing();

    return {
      id: userId,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emails: user.emailAddresses.map((email) => email.emailAddress),
      // No phone numbers. This is a paid feature in Clerk and is not available to us.
    };
  }),
  createUser: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    await db.insert(usersTable).values({ id: userId }).onConflictDoNothing();

    return { success: true };
  }),
});
