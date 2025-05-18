import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Image, 
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
      console.log('Sign in error:', err)
      if (err && err.errors && Array.isArray(err.errors)) {
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
          setError(err.errors[0]?.message || 'Sign in failed')
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
        <Text className="text-white text-base mb-[5px]">Email</Text>
        <TextInput
          className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="gray"
          onChangeText={setEmailAddress}
          keyboardType='email-address'
        />
        <Text className="text-white text-base mb-[5px]">Password</Text>
        <TextInput
          className="h-[70px] bg-[#121111] rounded-[15px] p-2.5 pl-5 my-[6px] text-white"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        {error && (
          <Text className="text-red-500 text-xs mt-[5px]">{error}</Text>
        )}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSubmitting}
          className={`bg-[#007AFF] mt-5 py-2.5 px-5 rounded-md self-center ${isSubmitting ? 'opacity-50' : ''}`}
        >
          <Text className="text-white font-bold">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text className="text-white text-center pt-2.5">
            Don&apos;t have an account? <Text className="text-[#007AFF] font-bold">Sign up 🚀</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text className="text-white text-center pt-2.5">
            Go to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
