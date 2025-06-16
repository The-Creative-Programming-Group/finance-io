import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Link, Redirect } from "expo-router";
import {
  CircleArrowDown,
  CircleCheck,
  Database,
  // https://github.com/lucide-icons/lucide/issues/670
  // We should replace this icon with an icon from one of the other recommended libraries
  Github,
  Tv,
} from "lucide-react-native";
import React from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import AppText from "~/components/AppText";

const FinanceIOIcon = require("~/assets/images/icon.png");

export default function Index() {
  const scheme = useColorScheme();
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"../home"} />;
  }

  const iconColor = scheme === "dark" ? "#E0E0E0" : "#111827";
  const iconBackground = scheme === "dark" ? "black" : "white";

  return (
    <ScrollView>
      <View className="h-full bg-background text-text dark:bg-dark-background dark:text-dark-text">
        <View className="mt-20 flex-row justify-center items-center gap-8">
          <Image source={FinanceIOIcon} className={"h-12 w-12 rounded-lg"}
             style={{ width: 48, height: 48, borderRadius: 12 }}
            />
          <AppText className="text-4xl">Finance.io</AppText>
        </View>

        <View className="ml-8 mt-12 flex-row justify-center">
          <Image
            source={require("~/assets/images/financeio-mockup.png")}
             style={{ width: 92, height: 183, borderRadius: 16 }}
            contentFit="contain"
          />
          <View className="w-6/12">
            <AppText className="text-md ml-6 text-text dark:text-dark-text">
              <AppText bold={true}>Introducing Finance.io,</AppText> the future
              of personal the makers of the trusted Weather.io, Chat.io.
            </AppText>
            <AppText className="text-md ml-6 mt-12 text-text dark:text-dark-text">
              Finance.io empowers you to take control of your money—securely,
              transparently, and without compromise.
            </AppText>
          </View>
        </View>
        <View className={"mt-12 flex-col items-center"}>
          <AppText className="text-2xl text-text dark:text-dark-text">
            Pros
          </AppText>
          <View>
            <View className="mt-8 flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                Free
              </AppText>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                High Security
              </AppText>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                No Ads
              </AppText>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                Open Source
              </AppText>
            </View>
            <View className="flex-row">
              <CircleCheck color={iconBackground} fill={iconColor} />
              <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                No data selling
              </AppText>
            </View>
          </View>
        </View>
        <View className="w-full flex-row items-center justify-center">
          <View className="mt-12 h-12 w-32 flex-row items-center justify-center rounded-lg bg-accent">
            <Link href={"/sign-up"}>
              <AppText
                medium={true}
                className={"text-xl"}
                style={{ color: "white" }}
              >
                Sign Up
              </AppText>
            </Link>
          </View>
        </View>
        <View className="mt-14 flex-col items-center">
          <AppText
            bold={true}
            className="mb-5 text-lg text-text dark:text-dark-text"
          >
            Why us ?
          </AppText>
          <CircleArrowDown size={30} color={iconBackground} fill={iconColor} />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row">
            <Image
              source={require("~/assets/images/iconGooglePlay.png")}
              style={{ width: 20, height: 20 , marginTop: 2}}
              contentFit="contain"
            />
            <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              Google Play
            </AppText>
          </View>
          <Image
            className="h-72 w-72 rounded-2xl border-2 border-stroke dark:border-dark-stroke"
            source={require("~/assets/images/googlePlayInstall.png")}
            style={{ width: 250, aspectRatio: 1, borderRadius: 16 }}
            contentFit="contain"
          />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row">
            <Image
              source={require("~/assets/images/iconAppStore.png")}
              style={{width: 19, height: 19, marginTop: 4}}
              contentFit="contain"
            />
            <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              App Store
            </AppText>
          </View>
          <Image
            className="h-72 w-72 rounded-2xl border-2 border-stroke dark:border-dark-stroke"
            source={require("~/assets/images/InstallAppStore.png")}
            style={{width: 250, height: 250, aspectRatio: 1, borderRadius: 16}}
          />
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row justify-center">
            <Github color={iconColor} />
            <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              Open Source
            </AppText>
          </View>
          <AppText className="w-7/12 text-text dark:text-dark-text">
            By embracing open-source principles, Weather.io invites
            collaboration and innovation from a global community of developers,
            ensuring a robust and customizable weather solution tailored to your
            needs.
          </AppText>
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row justify-center">
            <Tv color={iconColor} />
            <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              No Ads
            </AppText>
          </View>
          <AppText className="w-7/12 text-text dark:text-dark-text">
            No ads. No distractions. Just a clean, focused experience built
            around your financial well-being.
          </AppText>
        </View>
        <View className="mt-12 flex-col items-center">
          <View className="flex-row justify-center">
            <Database color={iconColor} />
            <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
              No data selling
            </AppText>
          </View>
          <AppText className="w-7/12 text-text dark:text-dark-text">
            Many apps make money by selling user data, we don&apos;t. Your trust
            matters more.
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}
