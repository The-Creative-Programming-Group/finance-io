import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "~/components/AppText";
import Navbar from "~/components/navbar";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
      <AppText className={"mt-20 text-text dark:text-dark-text"}>
        Profile Page
      </AppText>
      <Navbar />
    </View>
  );
};

export default Profile;
