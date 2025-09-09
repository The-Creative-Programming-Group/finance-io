import type React from "react";
import { ImageSourcePropType } from "react-native";
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

export interface NavigationOption {
  name: string;
  title: ProfileSectionType;
  icon: ImageSourcePropType;
  iconActive: ImageSourcePropType;
}

export enum ProfileSectionType {
  DASHBOARD = "navigationDashboard",
  TRANSACTIONS = "navigationTransactions",
  INSIGHTS = "navigationInsights",
  SETTINGS = "navigationSettings",
  CATEGORIES = "navigationCategory",
  PROFILE = "navigationProfile",
  BANK_ACCOUNTS = "navigationBankAccounts",
  NOTIFICATIONS = "navigationNotifications",
}
