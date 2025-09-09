import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "~/utils/trpc";
import superjson from "superjson";
import { Platform } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

interface TRPCProviderProps {
  children: React.ReactNode;
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const { getToken } = useAuth();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    // Hey team, just a quick note on this baseUrl logic:
    // For local dev, we're using localhost for iOS simulators and 10.0.2.2 for Android emulators.
    // When running on a real device or in production, make sure to set EXPO_PUBLIC_API_URL to your actual backend URL.
    // This setup lets us develop and test locally without hassle, and we can easily switch to production by setting the env variable.
    // If you're ever wondering why it's not just a static URL, it's so we don't have to keep changing code for local vs prod/dev builds.
    const baseUrl =
      process.env.EXPO_PUBLIC_API_URL ||
      (Platform.OS === "android"
        ? "http://10.0.2.2:8081" // Android emulator
        : Platform.OS === "ios"
          ? "http://localhost:8081" // iOS simulator
          : "https://api.example.com"); // fallback just in case

    // Reminder: Always set EXPO_PUBLIC_API_URL for production or device testing.
    // Localhost won't work from a real device, so this is just for our local workflow.
    // If you have questions about this, ping me!

    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
          transformer: superjson,
          async headers() {
            const token = await getToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
