import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { View } from 'react-native'
import ErrorBoundary from './components/ErrorBoundary'
import '../global.css' // Import global CSS for NativeWind


const rateLimiter = {
  attempts: {},
  maxAttempts: 5,
  timeWindow: 300000, // 5 minutes in milliseconds

  checkLimit(key) {
    const now = Date.now();
    if (!this.attempts[key]) {
      this.attempts[key] = { count: 0, timestamp: now };
      return true;
    }

    const attempt = this.attempts[key];
    if (now - attempt.timestamp > this.timeWindow) {
      attempt.count = 0;
      attempt.timestamp = now;
      return true;
    }

    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  },

  reset(key) {
    delete this.attempts[key];
  }
};

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (!item) {
        console.log('No values stored under key: ' + key)
        return null;
      }
      // Return the string directly (do not parse as JSON)
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      // Store as a string
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      return await SecureStore.setItemAsync(key, stringValue);
    } catch (err) {
      console.error('Error saving token:', err);
      return null;
    }
  },
}

// Environment variable check with detailed error
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. ' +
    'Please add it to your .env file and restart the app.'
  );
}

function RootLayoutNav() {
  return (
    <ErrorBoundary>
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
        <ClerkLoaded>
          <View className="flex-1 bg-black p-2.5">
            <Slot />
          </View>
        </ClerkLoaded>
      </ClerkProvider>
    </ErrorBoundary>
  )
}

export default RootLayoutNav