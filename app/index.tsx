import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { CircleCheck, Github, Tv, CircleArrowDown } from "lucide-react-native";
import AppText from "~/app/AppText";

export default function Index() {
  const scheme = useColorScheme();

  const iconColor = scheme === "dark" ? "#E0E0E0" : "#111827";
  const iconBackground = scheme === "dark" ? "black" : "white";

  return (
    <ScrollView>
      <View className="font-raleway h-full bg-background text-text dark:bg-dark-background dark:text-dark-text">
        <View className="mt-12 flex-row justify-center">
          <Image
            source={require("../assets/images/icon.png")}
            className={"h-12 w-12 rounded-lg"}
          />
          <AppText className="ml-4 mt-1.5 text-3xl text-text dark:text-dark-text">
            Finance.io
          </AppText>
        </View>
        <View className="ml-8 mt-12 flex-row justify-center">
          <Image
            source={require("../assets/images/financeio-mockup.png")}
            className={"h-64 w-32 rounded-lg"}
          />
          <View className="w-6/12">
            <AppText className="text-md ml-6 text-text dark:text-dark-text">
              <AppText className="font-bold">Introducing Finance.io,</AppText>{" "}
              the future of personal the makers of the trusted Weather.io,
              Chat.io.
            </AppText>
            <Text className="text-md ml-6 mt-12 text-text dark:text-dark-text">
              Finance.io empowers you to take control of your money—securely,
              transparently, and without compromise.
            </Text>
          </View>
        </View>
        <View className={"mt-12 flex-col items-center"}>
          <AppText className="text-2xl text-text dark:text-dark-text">
            Pros
          </AppText>
          <View>
            <View className="mt-8 flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg font-bold text-text dark:text-dark-text">
                Free
              </AppText>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <Text className="ml-2 text-lg text-text dark:text-dark-text">
                High Security
              </Text>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <Text className="ml-2 text-lg font-bold text-text dark:text-dark-text">
                No Ads
              </Text>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <Text className="ml-2 text-lg font-bold text-text dark:text-dark-text">
                Open Source
              </Text>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <Text className="ml-2 text-lg font-bold text-text dark:text-dark-text">
                No data selling
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-12 flex-row justify-center">
          <Pressable
            className={
              "h-12 w-32 flex-row items-center justify-center rounded-lg bg-accent"
            }
          >
            <AppText style={{ color: "white" }} className="text-xl">
              Sign Up
            </AppText>
          </Pressable>
        </View>
        <View className="mt-14 flex-col items-center">
          <AppText className="mb-5 text-lg text-text dark:text-dark-text">
            Why us ?
          </AppText>
          <CircleArrowDown size={30} color={iconBackground} fill={iconColor} />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row">
            <Image
              className="h-6 w-6"
              source={require("../assets/images/iconGooglePlay.png")}
            />
            <Text className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              Google Play
            </Text>
          </View>
          <Image
            className="h-72 w-72 rounded-2xl border-2 border-stroke dark:border-dark-stroke"
            source={require("../assets/images/googlePlayInstall.png")}
          />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row">
            <Image
              className="h-6 w-6"
              source={require("../assets/images/iconAppStore.png")}
            />
            <Text className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              App Store
            </Text>
          </View>
          <Image
            className="h-72 w-72 rounded-2xl rounded-md border-2 border-stroke dark:border-dark-stroke"
            source={require("../assets/images/InstallAppStore.png")}
          />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row justify-center">
            <Github color={iconColor} />
            <Text className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              Open Source
            </Text>
          </View>
          <Text className="w-7/12 text-text dark:text-dark-text">
            By embracing open-source principles, Weather.io invites
            collaboration and innovation from a global community of developers,
            ensuring a robust and customizable weather solution tailored to your
            needs.
          </Text>
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row justify-center">
            <Tv color={iconColor} />
            <Text className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              No Ads
            </Text>
          </View>
          <Text className="w-7/12 text-text dark:text-dark-text">
            No ads. No distractions. Just a clean, focused experience built
            around your financial well-being.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
