import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../server';

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: ({ req }: { req: Request }) => ({
      headers: Object.fromEntries(req.headers),
    }),
  });

export { handler as GET, handler as POST };