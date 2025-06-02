import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { env } from "../env";
import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css"; // Import global CSS for NativeWind
import { TRPCReactProvider } from "~/trpc/react";
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
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

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
        <View className="flex-1 bg-black p-2.5">
          <Slot />
        </View>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
