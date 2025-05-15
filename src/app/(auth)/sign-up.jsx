import React, { useState } from 'react'
import { 
  TextInput, 
  View, 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  // New fields for design
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  // Removed phoneNumber state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation helper
  const validate = () => {
    const newErrors = {}
    if (!firstname) newErrors.firstname = 'First name is required'
    if (!lastname) newErrors.lastname = 'Last name is required'
    if (!email) newErrors.email = 'Email is required'
    // Removed phone number validation
    if (!password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    if (!isLoaded) return
    setError(null)
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstname,
        lastName: lastname,
        // Removed phoneNumber from Clerk call
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
      setError(null)
    } catch (err) {
      console.log('Sign up error:', err)
      if (err.errors) {
        const passwordError = err.errors.find(error => error.code === 'form_password_pwned')
        const lengthError = err.errors.find(error => error.code === 'form_password_length_too_short')
        setError(null)
        if (passwordError) setError('Your password has been found in a data breach, Please use a different password')
        else if (lengthError) setError('Your password must be at least 8 characters long')
        else setError(err.errors[0]?.message || 'Sign up failed')
      } else {
        setError('Unknown Error occurred')
      }
    }
    setIsSubmitting(false)
  }

  const handleVerify = async () => {
    if (!isLoaded) return
    setError(null)
    setIsSubmitting(true)
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code })
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        setError('Verification failed. Please try again.')
      }
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const verificationError = err.errors[0]
        if (verificationError.code === 'verification_already_verified') {
          // Try to sign in the user automatically
          try {
            const { signIn } = require('@clerk/clerk-expo')
            const signInObj = signIn()
            const signInAttempt = await signInObj.create({
              identifier: email,
              password,
            })
            if (signInAttempt.status === 'complete') {
              await setActive({ session: signInAttempt.createdSessionId })
              router.replace('/')
            } else {
              setError('Email already verified. Please sign in.')
            }
          } catch (signInErr) {
            setError('Email already verified. Please sign in.')
          }
        } else if (verificationError.code === 'verification_expired') {
          setError('Verification code has expired. Please request a new one')
        } else {
          setError(verificationError.message || 'Invalid verification code')
        }
      } else {
        setError('Invalid verification code. Please try again.')
      }
    }
    setIsSubmitting(false)
  }

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

        {!pendingVerification ? (
          <>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={setFirstname}
            />
            {errors.firstname && (
              <Text style={styles.errorText}>{errors.firstname}</Text>
            )}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              placeholderTextColor="gray"
              value={lastname}
              onChangeText={setLastname}
            />
            {errors.lastname && (
              <Text style={styles.errorText}>{errors.lastname}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Removed Phone Number Field */}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={isSubmitting}
              style={[
                styles.button,
                isSubmitting && styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <Link href="/sign-in" style={styles.text}>
              Already have an account? Sign in 🥳
            </Link>
          </>
        ) : (
          <>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter code"
              placeholderTextColor="gray"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={isSubmitting}
              style={[
                styles.button,
                isSubmitting && styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          </>
        )}
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