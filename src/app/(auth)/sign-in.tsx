import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from 'expo-image';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // const onSignInPress = useCallback(async () => {
  //   if (!isLoaded) return;
  //   setError(null);
  //   setIsSubmitting(true);
  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: emailAddress,
  //       password,
  //     });

  //     if (signInAttempt.status === "complete") {
  //       await setActive({ session: signInAttempt.createdSessionId });
  //       router.replace("./");
  //     } else {
  //       setError("Sign in failed. Please check your credentials");
  //       console.error(JSON.stringify(signInAttempt, null, 2));
  //     }
  //   } catch (err: any) {
  //     console.log("Sign in error:", err);

  //     if (err && err.errors && Array.isArray(err.errors)) {
  //       const identifierError = err.errors.find(
  //         (error: { code: string }) => error.code === "form_identifier_invalid",
  //       );
  //       const passwordError = err.errors.find(
  //         (error: { code: string }) => error.code === "form_password_incorrect",
  //       );
  //        // default error message
  //      setError('Sign in failed');
  //       if (identifierError) {
  //         setError("User does not exist");
  //       } else if (passwordError) {
  //         setError("Your password is incorrect");
  //       } else {
  //         setError(err.errors[0]?.message);
  //       }
  //     } else {
  //       setError("Unknown Error occurred");
  //       console.error(JSON.stringify(err, null, 2));
  //     }
  //   }
  //   setIsSubmitting(false);
  // }, [isLoaded, emailAddress, password]);


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
      // Type guard to check if err is an object and has 'errors' property
      if (
        typeof err === 'object' &&
        err !== null &&
        'errors' in err &&
        Array.isArray((err as any).errors)
      ) {
        const errors = (err as { errors: Array<{ code: string }> }).errors;
        const identifierError = errors.find(error => error.code === 'form_identifier_invalid');
        const passwordError = errors.find(error => error.code === 'form_password_incorrect');
        setError('Sign in failed');
        if (identifierError) {
          setError('User does not exist');
        } else if (passwordError) {
          setError('Your password is incorrect');
        }
      } else {
        setError('Unknown Error occurred');
        console.error(JSON.stringify(err, null, 2));
      }
    }
    setIsSubmitting(false)
  }, [isLoaded, emailAddress, password])
  return (

    // Use "padding" on iOS so the view shifts up smoothly when the keyboard appears.
    // Use "height" on Android and other platforms to resize the view height when the keyboard is shown.
    // This provides the best keyboard handling experience for each platform.
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-black p-2.5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-5 flex-row items-center justify-center">
          <Image
            source={require("../../assets/images/icon.png")}
            className="mb-[18px] mr-2.5 h-[50px] w-[50px]"
          />
          <Text className="mb-5 text-center text-[30px] text-white">
            Finance.io
          </Text>
        </View>
        <Text className="mb-[5px] text-base text-white">Email</Text>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="gray"
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address"
        />
        <Text className="mb-[5px] text-base text-white">Password</Text>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
          accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
        />
        {error && (
          <Text className="mt-[5px] text-xs text-red-500">{error}</Text>
        )}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSubmitting}
          accessibilityLabel={isSubmitting ? "Signing in" : "Sign in"}
          accessibilityRole="button"
          className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
        >
          <Text className="font-bold text-white">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("./sign-up")}
          accessibilityLabel="Create a new account"
          accessibilityRole="link"
        >

          <Text className="pt-2.5 text-center text-white">
            Don&apos;t have an account?{" "}
            <Text className="font-bold text-[#007AFF]">Sign up 🚀</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("./")}
          accessibilityLabel="Go to home"
          accessibilityRole="link"
        >
          <Text className="pt-2.5 text-center text-white">Go to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
