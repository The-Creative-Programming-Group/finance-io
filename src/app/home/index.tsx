import AppText from "~/components/AppText";
import { TouchableOpacity, View } from "react-native";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

const Home = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("..//(auth)/sign-in");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <View>
      <AppText className={"mt-20 text-dark-text"}>Hello</AppText>
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
