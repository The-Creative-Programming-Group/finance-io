import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { ClerkUser } from "~/types";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }): Promise<ClerkUser> => {
    const userId = ctx.userId!;
    const user = ctx.user;

    await db.insert(usersTable).values({ id: userId }).onConflictDoNothing();

    return {
      id: userId,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emails: user.emailAddresses.map((email) => email.emailAddress),
      phoneNumbers: user.phoneNumbers.map((phone) => phone.phoneNumber),
    };
  }),
});
