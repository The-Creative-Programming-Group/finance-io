import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../api/trpc";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      // Remove artificial delay for production
      return {
        greeting: `Hi ${input.text}`,
      };
    }),
});
