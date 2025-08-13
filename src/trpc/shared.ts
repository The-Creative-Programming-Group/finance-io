import superjson from "superjson";

export const transformer = superjson;

function getBaseUrl() {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("EXPO_PUBLIC_API_URL environment variable is required");
  }
  return baseUrl;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}