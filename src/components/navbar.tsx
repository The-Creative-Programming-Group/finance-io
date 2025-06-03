import { TouchableOpacity, useColorScheme, View } from "react-native";
import AppText from "~/components/AppText";
import { CreditCard, ChartColumn, Settings } from "lucide-react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";

const Navbar = () => {
  const scheme = useColorScheme();
  const route = useRoute();
  const iconColor = scheme === "dark" ? "#E0E0E0" : "#111827";
  console.log(route.name);

  return (
    <View className="absolute bottom-0 h-24 w-full flex-row items-center justify-around border-t-2 border-stroke bg-secondary dark:border-dark-stroke dark:bg-dark-secondary">
      <TouchableOpacity
        onPress={() => {
          router.replace("/home");
        }}
        className="mb-5 flex-col items-center"
      >
        <CreditCard
          width={25}
          height={25}
          color={route.name.startsWith("home") ? "#3C73E9" : iconColor}
        />
        <AppText
          className={`mt-1 text-xs ${route.name.startsWith("home") ? "text-accent" : "text-text dark:text-dark-text"}`}
        >
          Banking
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.replace("/");
        }}
        className="mb-5 flex items-center"
      >
        <ChartColumn
          width={25}
          height={25}
          color={route.name.startsWith("insights") ? "#3C73E9" : iconColor}
        />
        <AppText
          className={`mt-1 text-xs ${route.name.startsWith("insights") ? "text-accent" : "text-text dark:text-dark-text"}`}
        >
          Insights
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.replace("/profile");
        }}
        className="mb-5 flex items-center"
      >
        <Settings
          width={25}
          height={25}
          color={route.name.startsWith("profile") ? "#3C73E9" : iconColor}
        />
        <AppText
          className={`mt-1 text-xs ${route.name.startsWith("profile") ? "text-accent" : "text-text dark:text-dark-text"}`}
        >
          Settings
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
