import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView 
} from 'react-native'

export default function Page() {
  const router = useRouter();
  const { user } = useUser()
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/sign-in');
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Finance.io</Text>
      </View>
      <SignedIn>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subText}>Please sign in or sign up to continue</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-up')}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignedOut>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#121111",
    borderRadius: 15,
    padding: 24,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})