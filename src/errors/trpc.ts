import { TRPCError } from "@trpc/server";

export const errors = {
  notAuthenticated: () =>
    new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" }),
  forbidden: (message: string = "Forbidden") =>
    new TRPCError({ code: "FORBIDDEN", message }),
  badRequest: (message: string = "Bad request") =>
    new TRPCError({ code: "BAD_REQUEST", message }),
  notFound: (message: string = "Not found") =>
    new TRPCError({ code: "NOT_FOUND", message }),
  conflict: (message: string = "Conflict") =>
    new TRPCError({ code: "CONFLICT", message }),
  internal: (message: string = "Internal server error") =>
    new TRPCError({ code: "INTERNAL_SERVER_ERROR", message }),
  tooManyRequests: (message: string = "Too many requests") =>
    new TRPCError({ code: "TOO_MANY_REQUESTS", message }),
};

export type StandardErrorFactory = typeof errors;


