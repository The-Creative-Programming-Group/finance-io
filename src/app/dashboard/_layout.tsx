import AppImage from "~/components/ui/AppImage";
import { Tabs } from "expo-router";
import React from "react";
import { NavigationOption, ProfileSectionType } from "~/types";
import { useTranslation } from "react-i18next";
import { useTheme } from "~/contexts/ThemeContext";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigationOptions: NavigationOption[] = [
    {
      name: "banking/index",
      title: ProfileSectionType.BANK_ACCOUNTS,
      icon: require("../../assets/Icons/navigation/banking-inactive.png"),
      iconActive: require("../../assets/Icons/navigation/banking-active.png"),
    },
    {
      name: "insights/index",
      title: ProfileSectionType.INSIGHTS,
      icon: require("../../assets/Icons/navigation/insights-inactive.png"),
      iconActive: require("../../assets/Icons/navigation/insights-active.png"),
    },
    {
      name: "settings/index",
      title: ProfileSectionType.SETTINGS,
      icon: require("../../assets/Icons/navigation/settings-inactive.png"),
      iconActive: require("../../assets/Icons/navigation/settings-active.png"),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {navigationOptions &&
        navigationOptions.length > 0 &&
        navigationOptions.map((option: NavigationOption) => (
          <Tabs.Screen
            key={option.name}
            name={option.name}
            options={{
              title: t(option.title),
              tabBarLabel: t(option.title),
              tabBarStyle: {
                backgroundColor: colors.secondary,
                borderColor: colors.stroke,
                paddingTop: 4,
              },
              tabBarIcon: ({ focused }) => (
                <AppImage
                  source={focused ? option.iconActive : option.icon}
                  className="h-6 w-6"
                  contentFit="contain"
                />
              ),
            }}
          />
        ))}
    </Tabs>
  );
};

export default DashboardLayout;
