import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return
    setError(null)
    setIsSubmitting(true)
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError('Sign in failed. Please check your credentials')
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors) {
        const identifierError = err.errors.find(error => error.code === 'form_identifier_invalid');
        const passwordError = err.errors.find(error => error.code === 'form_password_incorrect');
        setError(null);
        if (identifierError) {
          setError('User does not exist')
        }
        else if (passwordError) {
          setError('Your password is incorrect')
        }
        else {
          setError('Sign in failed')
        }
      }
      else {
        setError('Unknown Error occurred')
        console.error(JSON.stringify(err, null, 2))
      }
    }
    setIsSubmitting(false)
  }, [isLoaded, emailAddress, password])

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Finance.io</Text>
        </View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="gray"
          onChangeText={setEmailAddress}
          keyboardType='email-address'
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSubmitting}
          style={[
            styles.button,
            isSubmitting && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={styles.text}>
            Don&apos;t have an account? <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Sign up 🚀</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.text}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
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
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 70,
    backgroundColor: "#121111",
    borderRadius: 15,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 6,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
})
