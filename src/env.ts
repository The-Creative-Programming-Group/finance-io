import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// TODO: This is not yet used in the project, but it is set up for future use.
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    CLERK_SECRET_KEY: z.string(),
  },
  client: {},
  runtimeEnv: process.env,
  clientPrefix: "EXPO_PUBLIC_",
});
