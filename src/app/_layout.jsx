import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { View, StyleSheet } from 'react-native'

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = "pk_test_dW5pdGVkLXN3aW5lLTk4LmNsZXJrLmFjY291bnRzLmRldiQ";

function RootLayoutNav() {
  return (
    <ClerkProvider 
      tokenCache={tokenCache} 
      publishableKey={publishableKey}
      // Add these new props for better network handling
      networkUrlOverride="https://clerk.united-swine-98.accounts.dev"
      connectNetworkUrlOverride="https://clerk.united-swine-98.accounts.dev"
      // Add retry options
      retryAttemptsCount={3}
      retryInitialDelayMs={500}
    >
      <ClerkLoaded>
        <View style={styles.container}>
          {/* <Slot screenOptions={{ headerShown: false }} /> */}
          <Slot />
        </View>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
})

export default RootLayoutNav
