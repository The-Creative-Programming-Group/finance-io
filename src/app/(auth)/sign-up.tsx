import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";

type newErrorType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
};

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // New fields for design
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  // Removed phoneNumber state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<newErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validation helper
  const validate = () => {
    const newErrors: newErrorType = {};
    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    // Removed phone number validation
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!isLoaded) return;
    setError(null);
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstname,
        lastName: lastname,
      });

      // Add a longer delay before preparing verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setError(null);
    } catch (err: any) {
      console.log("Sign up error:", err);

      if (err.errors) {
        const passwordError = err.errors.find(
          (error: { code: string }) => error.code === "form_password_pwned",
        );
        const lengthError = err.errors.find(
          (error: { code: string }) =>
            error.code === "form_password_length_too_short",
        );
        setError(null);
        if (passwordError)
          setError(
            "Your password has been found in a data breach, Please use a different password",
          );
        else if (lengthError)
          setError("Your password must be at least 8 characters long");
        else setError(err.errors[0]?.message || "Sign up failed");
      } else {
        setError("Unknown Error occurred");
      }
    }
    setIsSubmitting(false);
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("./");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        const verificationError = err.errors[0];
        if (verificationError.code === "verification_already_verified") {
          try {
            const { signIn } = require("@clerk/clerk-expo");
            const signInObj = signIn();
            const signInAttempt = await signInObj.create({
              identifier: email,
              password,
            });
            if (signInAttempt.status === "complete") {
              await setActive({ session: signInAttempt.createdSessionId });
              router.replace("./");
            } else {
              setError("Email already verified. Please sign in.");
            }
          } catch (signInErr) {
            setError("Email already verified. Please sign in.");
          }
        } else if (verificationError.code === "verification_expired") {
          setError("Verification code has expired. Please request a new one");
        } else {
          setError(verificationError.message || "Invalid verification code");
        }
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
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

        {!pendingVerification ? (
          <>
            <Text className="mb-[5px] text-base text-white">First Name</Text>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
              placeholder="Enter first name"
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={setFirstname}
            />
            {errors.firstname && (
              <Text className="mt-[5px] text-xs text-red-500">
                {errors.firstname}
              </Text>
            )}

            <Text className="mb-[5px] text-base text-white">Last Name</Text>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
              placeholder="Enter last name"
              placeholderTextColor="gray"
              value={lastname}
              onChangeText={setLastname}
            />
            {errors.lastname && (
              <Text className="mt-[5px] text-xs text-red-500">
                {errors.lastname}
              </Text>
            )}

            <Text className="mb-[5px] text-base text-white">Email</Text>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
              placeholder="Enter email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text className="mt-[5px] text-xs text-red-500">
                {errors.email}
              </Text>
            )}

            <Text className="mb-[5px] text-base text-white">Password</Text>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
              placeholder="Enter password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <Text className="mt-[5px] text-xs text-red-500">
                {errors.password}
              </Text>
            )}

            {error && (
              <Text className="mt-[5px] text-xs text-red-500">{error}</Text>
            )}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={isSubmitting}
              className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
            >
              <Text className="font-bold text-white">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <Link
              href="./sign-in.tsx"
              className="pt-2.5 text-center text-white"
            >
              Already have an account? Sign in 🥳
            </Link>
          </>
        ) : (
          <>
            <Text className="mb-[5px] text-base text-white">
              Verification Code
            </Text>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-[#121111] p-2.5 pl-5 text-white"
              placeholder="Enter code"
              placeholderTextColor="gray"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            {error && (
              <Text className="mt-[5px] text-xs text-red-500">{error}</Text>
            )}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={isSubmitting}
              className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
            >
              <Text className="font-bold text-white">
                {isSubmitting ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
