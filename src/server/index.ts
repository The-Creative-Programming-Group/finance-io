import { router } from "./trpc";
import { welcomeRouter } from "./routers/welcome";

export const appRouter = router({
  account: welcomeRouter,
});

export type AppRouter = typeof appRouter;
