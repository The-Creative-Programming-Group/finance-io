import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import superjson from 'superjson';
import { Platform } from 'react-native';

interface TRPCProviderProps {
  children: React.ReactNode;
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    // Get the base URL based on platform
    const baseUrl = Platform.select({
      // For iOS simulator
      ios: 'http://localhost:8081',
      // For Android simulator
      android: 'http://10.0.2.2:8081',
      // For web
      web: process.env.EXPO_PUBLIC_API_URL,
      // Fallback
      default: process.env.EXPO_PUBLIC_API_URL,
    });

    console.log('Platform:', Platform.OS);
    console.log('Base URL:', baseUrl);

    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
          transformer: superjson,
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}