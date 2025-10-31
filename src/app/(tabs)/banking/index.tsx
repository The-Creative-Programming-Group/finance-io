import React from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { ScrollView, StatusBar } from "react-native";
import { SectionHeader } from "~/components/SectionHeader";
import { AccountItem } from "~/components/AccountItem";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "~/utils/trpc";

const Dashboard = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const { data: accounts, isLoading: isLoadingAccounts } =
    trpc.accounts.getAccounts.useQuery();

  const handleAccountPress = (accountName: string, accountId: string) => {
    console.log(`Pressed ${accountName} with ID: ${accountId}`);
    // modal logic here
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
        {accounts?.find(
          (account) =>
            account.reference === "private" || account.reference === "business",
        ) ? (
          <SectionHeader title={t("dashboardDailyAccounts")} delay={400} />
        ) : null}

        {accounts?.find((account) => account.reference === "private") ? (
          <SectionHeader title={t("dashboardPrivate")} delay={500} />
        ) : null}
        {accounts?.map(
          (account, index) =>
            account.reference === "private" && (
              <AccountItem
                key={account.id}
                name={account.bankName}
                amount={account.currentBalance}
                delay={600 + index * 100}
                onPress={() => handleAccountPress(account.bankName, account.id)}
              />
            ),
        )}

        {/* Business Accounts Section */}
        {accounts?.find((account) => account.reference === "business") ? (
          <SectionHeader title={t("dashboardBusiness")} delay={800} />
        ) : null}
        {accounts?.map(
          (account, index) =>
            account.reference === "business" && (
              <AccountItem
                key={account.id}
                name={account.bankName}
                amount={account.currentBalance}
                delay={900 + index * 100}
                onPress={() => handleAccountPress(account.bankName, account.id)}
              />
            ),
        )}

        {/* Savings Accounts Section */}
        {accounts?.find((account) => account.reference === "savings") ? (
          <SectionHeader title={t("dashboardSavings")} delay={1000} />
        ) : null}
        {accounts?.map(
          (account, index) =>
            account.reference === "savings" && (
              <AccountItem
                key={account.id}
                name={account.bankName}
                amount={account.currentBalance}
                delay={1100 + index * 100}
                onPress={() => handleAccountPress(account.bankName, account.id)}
              />
            ),
        )}

        {/* Shared Funds Section */}
        {accounts?.find((account) => account.reference === "shared") && (
          <SectionHeader title={t("sharedFunds")} delay={1000} />
        )}
        {accounts?.map(
          (account, index) =>
            account.reference === "shared" && (
              <AccountItem
                key={account.id}
                name={account.bankName}
                amount={account.currentBalance}
                delay={1100 + index * 100}
                onPress={() => handleAccountPress(account.bankName, account.id)}
              />
            ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
