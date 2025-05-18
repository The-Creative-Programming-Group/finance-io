import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
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
    <SafeAreaView className="flex-1 bg-black items-center px-5">
      <View className="items-center mt-15 mb-15">
        <Image
          source={require("../assets/images/icon.png")}
          className="w-15 h-15 mb-4"
        />
        <Text className="text-2xl text-white font-bold">Finance.io</Text>
      </View>
      
      <SignedIn>
        <TouchableOpacity 
          className="bg-[#007AFF] py-4 rounded-lg w-full items-center"
          onPress={handleLogout}
        >
          <Text className="text-white text-base font-semibold">Logout</Text>
        </TouchableOpacity>
      </SignedIn>

      <SignedOut>
        <View className="w-full px-5">
          <TouchableOpacity 
            className="bg-[#007AFF] py-4 rounded-lg w-full items-center"
            onPress={() => router.push('/sign-in')}
          >
            <Text className="text-white text-base font-semibold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-[#007AFF] py-4 rounded-lg w-full items-center mt-4"
            onPress={() => router.push('/sign-up')}
          >
            <Text className="text-white text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </SafeAreaView>
  )
}
