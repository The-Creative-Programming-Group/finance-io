import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppText from "~/components/AppText";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { Image } from "expo-image";
import InputOtp from "~/components/ui/input-otp";

type newErrorType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
};

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<newErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const validate = () => {
    const newErrors: newErrorType = {};
    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
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
        unsafeMetadata: {
          firstName: firstname,
          lastName: lastname,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.log("Sign up error:", err);
      if (err?.errors?.length) {
        const clerkErr = err.errors[0];
        switch (clerkErr.code) {
          case "form_password_pwned":
            setError(
              "Your password has been found in a data breach. Please use a different one."
            );
            break;
          case "form_password_length_too_short":
            setError("Password must be at least 8 characters.");
            break;
          default:
            setError(clerkErr.message || "Sign‑up failed.");
        }
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("../home");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        const verificationError = err.errors[0];
        if (verificationError.code === "verification_already_verified") {
          try {
            const signInAttempt = await signIn?.create({
              identifier: email,
              password,
            });
            if (signInAttempt?.status === "complete") {
              await setActive({ session: signInAttempt.createdSessionId });
              router.replace("../home");
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
        className="flex-1 bg-background p-2.5 dark:bg-dark-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex items-center justify-center mb-5">
          <Image
            source={require("../../assets/images/icon.png")}
            className="mb-[18px] mr-2.5 h-[50px] w-[50px]"
          />
          <AppText className="mb-5 text-center text-[30px] text-text dark:text-dark-text">
            Finance.io
          </AppText>
          {pendingVerification && (
            <AppText className="flex mx-5 mb-20 text-text dark:text-dark-text">
              We have sent a verification code to your email address ({email}).
              Enter it here to continue.
            </AppText>
          )}
        </View>

        {!pendingVerification ? (
          <>
            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              First Name
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder="Enter first name"
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={setFirstname}
            />
            {errors.firstname && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.firstname}
              </AppText>
            )}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              Last Name
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder="Enter last name"
              placeholderTextColor="gray"
              value={lastname}
              onChangeText={setLastname}
            />
            {errors.lastname && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.lastname}
              </AppText>
            )}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              Email
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder="Enter email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.email}
              </AppText>
            )}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              Password
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder="Enter password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.password}
              </AppText>
            )}

            {error && (
              <AppText className="mt-[5px] text-xs text-danger">
                {error}
              </AppText>
            )}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={isSubmitting}
              accessibilityLabel="Sign Up"
              accessibilityHint="Create a new account"
              accessibilityRole="button"
              className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
            >
              <AppText semibold={true} className="text-dark-text">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </AppText>
            </TouchableOpacity>

            <Link
              href="./sign-in"
              className="pt-2.5 text-center text-text dark:text-dark-text"
            >
              Already have an account? Sign in 🥳
            </Link>
          </>
        ) : (
          <>
            <InputOtp onCodeChange={setOtpCode} />
            {error && (
              <AppText className="ml-6 mt-[5px] text-sm text-danger">
                {error}
              </AppText>
            )}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={isSubmitting}
              accessibilityLabel={
                isSubmitting ? "Verifying code" : "Verify code"
              }
              accessibilityRole="button"
              className={`mt-10 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
            >
              <AppText className="font-bold text-text dark:text-dark-text">
                {isSubmitting ? "Verifying..." : "Verify"}
              </AppText>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
