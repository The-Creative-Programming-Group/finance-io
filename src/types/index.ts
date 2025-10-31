import { References } from "~/schemas/welcomeSchema";
import { categoriesTable, currenciesTable } from "~/db/schema";
import { InferSelectModel } from "drizzle-orm";

/**
 * Our database only saves the Clerk user id, so we need to get the user details from Clerk.
 * When we request the user details from our backend, it automatically gets the user details from Clerk.
 */
export interface ClerkUser {
  id: string;
  firstName: string;
  lastName: string;
  emails: string[];
  // No phone numbers. This is a paid feature in Clerk and is not available to us.
}

export interface Account {
  id: string;
  bankName: string;
  currentBalance: string;
  reference: References;
  usage: string;
  currencyId: string;
}

export type Category = InferSelectModel<typeof categoriesTable>;

export type Currency = InferSelectModel<typeof currenciesTable>;

export interface AccountWithCurrency extends Account {
  currency: Currency;
}

export interface Transaction {
  id: string;
  categoryId: string;
  company: string;
  amount: string;
  datetime: Date;
  description: string;
  accountId: string;
}

export interface TransactionWithCategoryAndAccount extends Transaction {
  category: Category;
  account: Account;
}

/**
 * NavigationItems
 *
 * Purpose:
 * - Strongly typed set of i18n keys for primary navigation labels (tabs/drawer/sidebar).
 *
 * Why string values:
 * - These values are translation keys consumed by react-i18next, e.g. `t(NavigationItems.BANKING)`.
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
 * 4) Use `t(NavigationItems.WALLET)` wherever a label is needed.
 *
 * Example: Using with Expo Router and i18next
 * -----------------------------------------------
 * import { NavigationItems } from "@/types";
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
 *           title: t(NavigationItems.BANKING),
 *           tabBarAccessibilityLabel: t(NavigationItems.BANKING),
 *         }}
 *       />
 *       <Tab.Screen
 *         name="Insights"
 *         component={InsightsScreen}
 *         options={{ title: t(NavigationItems.INSIGHTS) }}
 *       />
 *       <Tab.Screen
 *         name="Settings"
 *         component={SettingsScreen}
 *         options={{ title: t(NavigationItems.SETTINGS) }}
 *       />
 *     </Tab.Navigator>
 *   );
 * }
 *
 * Example: Building a typed menu model
 * ------------------------------------
 * type NavItem = {
 *   key: NavigationItems;
 *   route: string; // or keyof RootStackParamList
 *   icon: React.ReactNode;
 * };
 *
 * const NAV_ITEMS: NavItem[] = [
 *   { key: NavigationItems.INSIGHTS, route: "Insights", icon: <InsightsIcon /> },
 *   { key: NavigationItems.BANKING, route: "Banking", icon: <BankIcon /> },
 *   { key: NavigationItems.SETTINGS, route: "Settings", icon: <SettingsIcon /> },
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
