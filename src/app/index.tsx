import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("./sign-in");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-black px-5">
      <View className="mt-15 mb-15 items-center">
        <Image
          source={require("../assets/images/icon.png")}
          className="w-15 h-15 mb-4"
        />
        <Text className="text-2xl font-bold text-white">Finance.io</Text>
      </View>

      <SignedIn>
        <TouchableOpacity
          className="w-full items-center rounded-lg bg-[#007AFF] py-4"
          onPress={handleLogout}
        >
          <Text className="text-base font-semibold text-white">Logout</Text>
        </TouchableOpacity>
      </SignedIn>

      <SignedOut>
        <View className="w-full px-5">
          <TouchableOpacity
            className="w-full items-center rounded-lg bg-[#007AFF] py-4"
            onPress={() => router.push("./sign-in")}
          >
            <Text className="text-base font-semibold text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4 w-full items-center rounded-lg bg-[#007AFF] py-4"
            onPress={() => router.push("./sign-up")}
          >
            <Text className="text-base font-semibold text-white">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}
