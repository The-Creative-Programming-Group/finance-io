import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "~/contexts/ThemeContext";
import {
  ChartColumnIcon,
  CreditCardIcon,
  LucideIcon,
  SettingsIcon,
} from "lucide-react-native";

interface NavigationOption {
  name: string;
  title: string;
  icon: LucideIcon;
}

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigationOptions: NavigationOption[] = [
    {
      name: "banking/index",
      title: t("navigationBankAccounts"),
      icon: CreditCardIcon,
    },
    {
      name: "insights/index",
      title: t("navigationInsights"),
      icon: ChartColumnIcon,
    },
    {
      name: "settings/index",
      title: t("navigationSettings"),
      icon: SettingsIcon,
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
              title: option.title,
              tabBarLabel: option.title,
              tabBarStyle: {
                backgroundColor: colors.secondary,
                borderColor: colors.stroke,
                paddingTop: 4,
              },
              tabBarIcon: ({ focused }) => (
                <option.icon
                  color={focused ? colors.accent : colors.text}
                  className="h-6 w-6"
                />
              ),
            }}
          />
        ))}
    </Tabs>
  );
};

export default DashboardLayout;
