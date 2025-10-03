import type React from "react";

export interface Account {
  id: string;
  name: string;
  amount: string;
  icon: React.ReactNode;
  type: "paypal" | "dkb" | "revolut" | "depot";
}

export interface Card {
  id: string;
  title: string;
  cardHolder: string;
  type: "debit" | "business";
  provider: "dkb" | "revolut";
}

export interface SharedFundsData {
  id: string;
  title: string;
  icon: React.ReactNode;
  arrow: React.ReactNode;
}
export interface DashboardData {
  user: {
    name: string;
  };
  cards: Card[];
  accounts: {
    private: Account[];
    business: Account[];
    safe: Account[];
  };
  sharedFunds: SharedFundsData;
}

/**
 * NavigationItemKey
 *
 * Purpose:
 * - Strongly typed set of i18n keys for primary navigation labels (tabs/drawer/sidebar).
 *
 * Why string values:
 * - These values are translation keys consumed by react-i18next, e.g. `t(NavigationItemKey.BANKING)`.
 *
 * Where translations live:
 * - See language files under `localization/`. Add matching entries for each supported language.
 *
 * Typical usage:
 * - As labels for tab/drawer items
 * - As screen headers/titles
 * - As accessibility labels for navigation elements
 *
 * Contract:
 * - Enum member names describe feature areas.
 * - Enum member values are stable i18n keys and should not change casually.
 *
 * Adding a new navigation item:
 * 1) Add a new enum member (e.g., `WALLET = "navigationWallet"`).
 * 2) Add translations for the new key in all language files in `localization/`.
 * 3) Map the new key to a route and icon where the navigation config is defined.
 * 4) Use `t(NavigationItemKey.WALLET)` wherever a label is needed.
 *
 * Example: Using with Expo Router and i18next
 * -----------------------------------------------
 * import { NavigationItemKey } from "@/types";
 * import { useTranslation } from "react-i18next";
 *
 * const Tab = createBottomTabNavigator();
 *
 * function AppTabs() {
 *   const { t } = useTranslation();
 *   return (
 *     <Tab.Navigator>
 *       <Tab.Screen
 *         name="Banking"
 *         component={BankingScreen}
 *         options={{
 *           title: t(NavigationItemKey.BANKING),
 *           tabBarAccessibilityLabel: t(NavigationItemKey.BANKING),
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Insights"
 *         component={InsightsScreen}
 *         options={{ title: t(NavigationItemKey.INSIGHTS) }}
 *       />
 *       <Tab.Screen
 *         name="Settings"
 *         component={SettingsScreen}
 *         options={{ title: t(NavigationItemKey.SETTINGS) }}
 *       />
 *     </Tab.Navigator>
 *   );
 * }
 *
 * Example: Building a typed menu model
 * ------------------------------------
 * type NavItem = {
 *   key: NavigationItemKey;
 *   route: string; // or keyof RootStackParamList
 *   icon: React.ReactNode;
 * };
 *
 * const NAV_ITEMS: NavItem[] = [
 *   { key: NavigationItemKey. INSIGHTS, route: "Insights", icon: <InsightsIcon /> },
 *   { key: NavigationItemKey. BANKING, route: "Banking", icon: <BankIcon /> },
 *   { key: NavigationItemKey. SETTINGS, route: "Settings", icon: <SettingsIcon /> },
 * ];
 *
 * // Rendering labels
 * // NAV_ITEMS.map(i => ({ label: t(i.key), ...i }))
 */
export enum NavigationItems {
  /** Insights/analytics area: charts, spending, trends. */
  INSIGHTS = "navigationInsights",
  /** Settings/preferences area: profile, security, language. */
  SETTINGS = "navigationSettings",
  /** Banking/accounts area: balances, transfers, cards. */
  BANKING = "navigationBankAccounts",
}
