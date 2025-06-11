import AppText from "~/components/AppText";
import { TouchableOpacity, View } from "react-native";
import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const Home = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("..//(auth)/sign-in");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
      <AppText className={"mt-20 text-text dark:text-dark-text"}>
        Hello {user?.firstName}, nice to meet you!
      </AppText>
      <TouchableOpacity
        className="w-full items-center rounded-lg bg-[#007AFF] py-4"
        onPress={handleLogout}
      >
        <AppText>Logout</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
