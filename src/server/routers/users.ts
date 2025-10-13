import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { User } from "~/types";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }): Promise<User> => {
    const userId = ctx.userId!;
    const user = ctx.user;

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (existingUsers.length === 0) {
      await db.insert(usersTable).values({ id: userId });
    }

    return {
      id: existingUsers[0].id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emails: user.emailAddresses.map((email) => email.emailAddress),
      phoneNumbers: user.phoneNumbers.map((phone) => phone.phoneNumber),
    };
  }),
});
