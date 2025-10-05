import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css"; // Import global CSS for NativeWind
import { TRPCProvider } from "~/components/TRPCProvider";
import { ThemeProvider } from "~/contexts/ThemeContext";
import "../i18n"; // Initialize i18n
import { useEffect } from "react";
import { languageService } from "~/services/languageService";

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

// Environment variable check with a detailed error
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function RootLayoutNav() {
  // Initialize language when the app starts
  useEffect(() => {
    const initLanguage = async () => {
      try {
        await languageService.initializeLanguage();
      } catch (error) {
        console.error("Error initializing language in root layout:", error);
      }
    };

    initLanguage();
  }, []);

  return (
    <ThemeProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <TRPCProvider>
            <View className="flex-1 bg-background dark:bg-dark-background">
              <Slot />
            </View>
          </TRPCProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  );
}
export default RootLayoutNav;
