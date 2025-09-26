/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { verifyToken } from "@clerk/backend";

// import { db } from "~/server/db";
import { db } from "~/db";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: any }) => {
  let userId: string | null = null;
  try {
    let authHeader: string | undefined;
    if (opts.headers instanceof Headers) {
      authHeader =
        opts.headers.get("authorization") ||
        opts.headers.get("Authorization") ||
        undefined;
    } else if (typeof opts.headers === "object") {
      authHeader =
        opts.headers["authorization"] ||
        opts.headers["Authorization"] ||
        undefined;
    }

    if (!authHeader) {
      return { db, userId: null, ...opts };
    }

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");

      if (!CLERK_SECRET_KEY) {
        console.error("CLERK_SECRET_KEY is not set");
        return { db, userId: null, ...opts };
      }

      // Use Clerk's verifyToken with the secret key for server-side verification
      const verifiedToken = await verifyToken(token, {
        secretKey: CLERK_SECRET_KEY,
      });
      userId = verifiedToken.sub || null;
    }
  } catch (err) {
    console.error("Error verifying Clerk token:", err);
    userId = null;
  }
  return {
    db,
    userId,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It guarantees
 * that a user querying is authorized and can access their own data.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error("Not authenticated");
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
