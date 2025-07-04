import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { env } from "../env";
import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css"; // Import global CSS for NativeWind
import { TRPCProvider } from '../components/TRPCProvider';

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
      await SecureStore.setItemAsync(key, stringValue);
    } catch (err) {
      console.error("Error saving token:", err);
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
    >
      <ClerkLoaded>
        <TRPCProvider>
          <View className="bg-black flex-1">
            <Slot />
          </View>
        </TRPCProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
