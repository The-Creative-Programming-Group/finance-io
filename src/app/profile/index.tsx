import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import AppText from "~/components/AppText";
import Navbar from "~/components/navbar";
import {
  ChevronRight,
  Users,
  BellRing,
  ShieldX,
  CreditCard,
  CircleDollarSign,
} from "lucide-react-native";
import { router } from "expo-router";
import type { LinkProps } from "expo-router";

interface Item {
  name: string;
  link: LinkProps["href"];
  icon?: React.ReactNode;
}

const Profile = () => {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "#E0E0E0" : "#111827";

  const [items, setItems] = useState<Item[]>([
    {
      name: "Profile",
      link: "./profile",
      icon: <Users width={20} color={iconColor} />,
    },
    {
      name: "Notification",
      link: "./",
      icon: <BellRing width={20} color={iconColor} />,
    },
    {
      name: "Limit",
      link: "./",
      icon: <ShieldX width={20} color={iconColor} />,
    },
    {
      name: "Income",
      link: "./",
      icon: <CircleDollarSign width={20} color={iconColor} />,
    },
    {
      name: "Bank Accounts",
      link: "./",
      icon: <CreditCard width={20} color={iconColor} />,
    },
  ]);

  return (
    <View className="h-screen bg-background dark:bg-dark-background">
      <ScrollView>
        <View className="h-screen w-full flex-1 items-center justify-center bg-background dark:bg-dark-background">
          <AppText
            semibold={true}
            className={"mt-15 text-2xl text-text dark:text-dark-text"}
          >
            User
          </AppText>
          <View className="w-full flex-col items-center">
            {items.slice(0, 2).map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(item.link);
                }}
                key={index}
                className="my-3 w-11/12 flex-row items-center justify-between rounded-xl border-[1px] border-stroke bg-secondary p-6 dark:border-dark-stroke dark:bg-dark-secondary"
              >
                <View className="flex-row items-center">
                  <View className="flex h-10 w-10 items-center justify-center rounded-3xl bg-primary dark:bg-dark-primary">
                    {item.icon}
                  </View>
                  <AppText
                    medium={true}
                    className="ml-4 text-lg text-text dark:text-dark-text"
                  >
                    {item.name}
                  </AppText>
                </View>
                <ChevronRight color={iconColor} />
              </TouchableOpacity>
            ))}
          </View>
          <AppText
            semibold={true}
            className={"mt-20 text-2xl text-text dark:text-dark-text"}
          >
            Finance
          </AppText>
          <View className="w-full flex-col items-center">
            {items.slice(2, 5).map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(item.link);
                }}
                key={index}
                className="my-3 w-11/12 flex-row items-center justify-between rounded-xl border-[1px] border-stroke bg-secondary p-6 dark:border-dark-stroke dark:bg-dark-secondary"
              >
                <View className="flex-row items-center">
                  <View className="flex h-10 w-10 items-center justify-center rounded-3xl bg-primary dark:bg-dark-primary">
                    {item.icon}
                  </View>
                  <AppText
                    medium={true}
                    className="ml-4 text-lg text-text dark:text-dark-text"
                  >
                    {item.name}
                  </AppText>
                </View>
                <ChevronRight color={iconColor} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default Profile;
