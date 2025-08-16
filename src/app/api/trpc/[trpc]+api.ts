import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../server";
import { createTRPCContext } from "../../../server/api/trpc";

const handler = (request: Request) => {
  console.log("tRPC API handler called");
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: async (opts) => {
      return createTRPCContext({ headers: opts.req.headers });
    },
  });
};

export { handler as GET, handler as POST };
