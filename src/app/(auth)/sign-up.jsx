import React, { useState } from 'react'
import { 
  TextInput, 
  View, 
  TouchableOpacity, 
  Text, 
  Image, 
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

  const handleSignup = async (retryCount = 0) => {
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
      })

      // Add a longer delay before preparing verification
      await new Promise(resolve => setTimeout(resolve, 2000))

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
      setError(null)
    } catch (err) {
      console.log('Sign up error:', err)

      if (err.message && err.message.includes('signed out')) {
        if (retryCount < 2) {
          console.log(`Retrying sign-up (attempt ${retryCount + 1})...`)
          await new Promise(resolve => setTimeout(resolve, 1000))
          setIsSubmitting(false)
          return handleSignup(retryCount + 1)
        }
        setError('Session error. Please restart the app and try again.')
        return
      }

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
      className="flex-1"
    >
      <ScrollView 
        className="flex-1 p-2.5 bg-black"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center justify-center mb-5">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-[50px] h-[50px] mr-2.5 mb-[18px]"
          />
          <Text className="text-[30px] text-white text-center mb-5">Finance.io</Text>
        </View>

        {!pendingVerification ? (
          <>
            <Text className="text-white text-base mb-[5px]">First Name</Text>
            <TextInput
              className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
              placeholder="Enter first name"
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={setFirstname}
            />
            {errors.firstname && (
              <Text className="text-red-500 text-xs mt-[5px]">{errors.firstname}</Text>
            )}

            <Text className="text-white text-base mb-[5px]">Last Name</Text>
            <TextInput
              className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
              placeholder="Enter last name"
              placeholderTextColor="gray"
              value={lastname}
              onChangeText={setLastname}
            />
            {errors.lastname && (
              <Text className="text-red-500 text-xs mt-[5px]">{errors.lastname}</Text>
            )}

            <Text className="text-white text-base mb-[5px]">Email</Text>
            <TextInput
              className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
              placeholder="Enter email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text className="text-red-500 text-xs mt-[5px]">{errors.email}</Text>}

            <Text className="text-white text-base mb-[5px]">Password</Text>
            <TextInput
              className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
              placeholder="Enter password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-[5px]">{errors.password}</Text>
            )}

            {error && (
              <Text className="text-red-500 text-xs mt-[5px]">{error}</Text>
            )}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={isSubmitting}
              className={`bg-[#007AFF] mt-5 py-2.5 px-5 rounded-md self-center ${isSubmitting ? 'opacity-50' : ''}`}
            >
              <Text className="text-white font-bold">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <Link href="/sign-in" className="text-white text-center pt-2.5">
              Already have an account? Sign in 🥳
            </Link>
          </>
        ) : (
          <>
            <Text className="text-white text-base mb-[5px]">Verification Code</Text>
            <TextInput
              className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
              placeholder="Enter code"
              placeholderTextColor="gray"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            {error && (
              <Text className="text-red-500 text-xs mt-[5px]">{error}</Text>
            )}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={isSubmitting}
              className={`bg-[#007AFF] mt-5 py-2.5 px-5 rounded-md self-center ${isSubmitting ? 'opacity-50' : ''}`}
            >
              <Text className="text-white font-bold">
                {isSubmitting ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
