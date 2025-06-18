import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { TRPCReactProvider } from "~/trpc/react";
import "../global.css"; // Import global CSS for NativeWind

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (!item) {
        console.log("No values stored under key: " + key);
        return null;
      }
      // Return the string directly (do not parse as JSON)
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string | object) {
    try {
      // Store as a string
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      return await SecureStore.setItemAsync(key, stringValue);
    } catch (err) {
      console.error("Error saving token:", err);
      return null;
    }
  },
};

// Environment variable check with detailed error
// This key should probably be moved to the /src/env.ts (T3 Env [https://env.t3.gg/])
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY – check your .env / Expo config",
  );
}

function RootLayoutNav() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}
      networkUrlOverride={process.env.EXPO_PUBLIC_CLERK_API_URL}
      connectNetworkUrlOverride={process.env.EXPO_PUBLIC_CLERK_API_URL}
      retryAttemptsCount={3}
      retryInitialDelayMs={500}
      sessionOptions={{
        lifetime: 7200, // 2 hours
        idleTimeout: 1800, // 30 minutes
      }}
    >
      <TRPCReactProvider>
        <View className="bg-black flex-1 p-2.5">
          <Slot />
        </View>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
