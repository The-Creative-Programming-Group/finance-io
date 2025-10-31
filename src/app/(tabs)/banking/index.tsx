import React from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { ScrollView, StatusBar } from "react-native";
import { SectionHeader } from "~/components/SectionHeader";
import { AccountItem } from "~/components/AccountItem";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "~/utils/trpc";
import type { References } from "~/schemas/welcomeSchema";
import type { Account } from "~/types";

const Dashboard = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const { data: accounts } = trpc.accounts.getAccounts.useQuery();

  const handleAccountPress = (accountName: string, accountId: string) => {
    console.log(`Pressed ${accountName} with ID: ${accountId}`);
    // modal logic here
  };

  // Type-safe reference constants
  const REFERENCE = React.useMemo(
    () =>
      ({
        PRIVATE: "private" as References,
        BUSINESS: "business" as References,
        SAVINGS: "savings" as References,
        SHARED: "shared" as References,
      }) as const,
    [],
  );

  // Pre-filter accounts once per reference type
  const privateAccounts = React.useMemo(
    () => (accounts ?? []).filter((a) => a.reference === REFERENCE.PRIVATE),
    [accounts, REFERENCE],
  );
  const businessAccounts = React.useMemo(
    () => (accounts ?? []).filter((a) => a.reference === REFERENCE.BUSINESS),
    [accounts, REFERENCE],
  );
  const savingsAccounts = React.useMemo(
    () => (accounts ?? []).filter((a) => a.reference === REFERENCE.SAVINGS),
    [accounts, REFERENCE],
  );
  const sharedAccounts = React.useMemo(
    () => (accounts ?? []).filter((a) => a.reference === REFERENCE.SHARED),
    [accounts, REFERENCE],
  );

  const hasDailyAccounts =
    privateAccounts.length > 0 || businessAccounts.length > 0;

  // Reusable section renderer
  const AccountSection: React.FC<{
    title: string;
    accounts: Account[];
    baseDelay?: number; // delay for SectionHeader; items will start at baseDelay + 100
    onPress: (accountName: string, accountId: string) => void;
  }> = ({ title, accounts, baseDelay = 0, onPress }) => {
    if (!accounts || accounts.length === 0) return null;
    return (
      <>
        <SectionHeader title={title} delay={baseDelay} />
        {accounts.map((account, index) => (
          <AccountItem
            key={account.id}
            name={account.bankName}
            amount={account.currentBalance}
            delay={baseDelay + 100 + index * 100}
            onPress={() => onPress(account.bankName, account.id)}
          />
        ))}
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView className="flex-1 p-8" showsVerticalScrollIndicator={false}>
        {/* Cards Section */}
        {/* <SectionHeader title="Cards" delay={100} />
        <SectionHeader title="Debitcard" size="medium" delay={150} />
        {mockDashboardData.cards
          .filter((card) => card.type === "debit")
          .map((card, index) => (
            <CardComponent
              key={card.id}
              title={card.title}
              cardHolder={card.cardHolder}
              delay={200 + index * 50}
              onPress={() => handleCardPress(card.title, card.id)}
            />
          ))}
        <SectionHeader title="Business Card" size="medium" delay={250} />
        {mockDashboardData.cards
          .filter((card) => card.type === "business")
          .map((card, index) => (
            <CardComponent
              key={card.id}
              title={card.title}
              cardHolder={card.cardHolder}
              delay={300 + index * 50}
              onPress={() => handleCardPress(card.title, card.id)}
            />
          ))} */}

        {hasDailyAccounts ? (
          <SectionHeader title={t("dashboardDailyAccounts")} delay={400} />
        ) : null}

        {/* Private Accounts Section */}
        <AccountSection
          title={t("dashboardPrivate")}
          accounts={privateAccounts}
          baseDelay={500}
          onPress={handleAccountPress}
        />

        {/* Business Accounts Section */}
        <AccountSection
          title={t("dashboardBusiness")}
          accounts={businessAccounts}
          baseDelay={800}
          onPress={handleAccountPress}
        />

        {/* Savings Accounts Section */}
        <AccountSection
          title={t("dashboardSavings")}
          accounts={savingsAccounts}
          baseDelay={1000}
          onPress={handleAccountPress}
        />

        {/* Shared Funds Section */}
        <AccountSection
          title={t("sharedFunds")}
          accounts={sharedAccounts}
          baseDelay={1000}
          onPress={handleAccountPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
