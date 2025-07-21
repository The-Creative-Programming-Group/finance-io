import { View, ScrollView, useColorScheme, TouchableOpacity, Modal } from "react-native";
// import React, { useEffect, useState } from "react";
import { Link, Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  CircleCheck,
  Github,
  Tv,
  CircleArrowDown,
  Database,
} from "lucide-react-native";
import AppText from "~/components/AppText";
import LottieView from "lottie-react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { languageService } from "~/services/languageService";
import * as Localization from 'expo-localization';

const LanguageDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "it", label: "Italiano" },
    { code: "de", label: "Deutsch" },
    { code: "pt", label: "Português" },
    { code: "ar", label: "العربية" },
    { code: "fa", label: "دری" },
    { code: "ps", label: "پښتو" },
    { code: "ur", label: "اردو" },
    { code: "hi", label: "हिन्दी" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "zh", label: "中文" },
    { code: "tr", label: "Türkçe" },
    { code: "ru", label: "Русский" }
  ];

  // Load the stored language when component mounts
  useEffect(() => {
    const initLanguage = async () => {
      try {
        // First initialize from stored preferences
        await languageService.initializeLanguage();
        // Then update our state to match i18n
        setCurrentLanguage(i18n.language);
      } catch (error) {
        console.error("Error initializing language:", error);
      }
    };

    initLanguage();

    // Set up listener for language changes
    const changeLanguageHandler = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', changeLanguageHandler);

    return () => {
      // Clean up listener when component unmounts
      i18n.off('languageChanged', changeLanguageHandler);
    };
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    try {
      await languageService.setLanguage(langCode);
      setCurrentLanguage(langCode);
      setVisible(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <View className="absolute right-5 top-24 z-50">
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        className="h-8 w-8 items-center justify-center rounded-full bg-secondary dark:bg-dark-secondary"
        accessibilityLabel="Change language"
        accessibilityRole="button"
      >
        <AppText className="text-base text-text dark:text-dark-text">🌐</AppText>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View className="absolute right-4 top-32 w-48 rounded-lg bg-secondary p-2 shadow-lg dark:bg-dark-secondary">
            {/* Scrollable language options */}
            <ScrollView
              className="max-h-[240px]"
              showsVerticalScrollIndicator={true}
              scrollIndicatorInsets={{ right: 1 }}
              style={{ maxHeight: 150 }} // Show exactly 5 items (36px per item)
            >
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  className={`rounded-md p-2 active:bg-gray-200 dark:active:bg-gray-700 ${currentLanguage === lang.code ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  accessibilityLabel={`Switch to ${lang.label}`}
                  accessibilityRole="button"
                >
                  <AppText className="text-text dark:text-dark-text">
                    {lang.label}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function Index() {
  // const [isLoading, setIsLoading] = useState(true);
  const scheme = useColorScheme();
  const { isSignedIn, isLoaded } = useAuth();
  const { t } = useTranslation();


  if (isSignedIn) {
    return <Redirect href={"../home"} />;
  }

  const iconColor = scheme === "dark" ? "#E0E0E0" : "#111827";
  const iconBackground = scheme === "dark" ? "black" : "white";

  return (
    <View className="relative flex-1">
      <LanguageDropdown />
      <ScrollView>
        <View className="mb-12 h-full bg-background text-text dark:bg-dark-background dark:text-dark-text">
          <View className="mt-20 flex-row justify-center">
            <Image
              source={require("../assets/images/icon.png")}
              style={{ width: 48, height: 48, borderRadius: 12 }}
            />
          </View>

          <View className="ml-8 mt-12 flex-row justify-center">
            <Image
              source={require("../assets/images/financeio-mockup.png")}
              style={{ width: 92, height: 183, borderRadius: 16 }}
              contentFit="contain"
            />
            <View className="w-6/12">
              <AppText className="text-md ml-6 text-text dark:text-dark-text">
                <AppText bold={true}>{t('introducing')}</AppText> {t('introText')}
              </AppText>
              <AppText className="text-md ml-6 mt-12 text-text dark:text-dark-text">
                {t('empowerText')}
              </AppText>
            </View>
          </View>
          <View className={"mt-12 flex-col items-center"}>
            <AppText className="text-2xl text-text dark:text-dark-text">
              {t('pros')}
            </AppText>
            <View>
              <View className="mt-8 flex-row">
                <CircleCheck color={iconBackground} fill={iconColor} />
                <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                  {t('free')}
                </AppText>
              </View>
              <View className="flex-row">
                <CircleCheck color={iconBackground} fill={iconColor} />
                <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                  {t('highSecurity')}
                </AppText>
              </View>
              <View className="flex-row">
                <CircleCheck color={iconBackground} fill={iconColor} />
                <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                  {t('noAds')}
                </AppText>
              </View>
              <View className="flex-row">
                <CircleCheck color={iconBackground} fill={iconColor} />
                <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                  {t('openSource')}
                </AppText>
              </View>
              <View className="flex-row">
                <CircleCheck color={iconBackground} fill={iconColor} />
                <AppText className="ml-2 text-lg text-text dark:text-dark-text">
                  {t('noDataSelling')}
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
                  {t('signUp')}
                </AppText>
              </Link>
            </View>
          </View>
          <View className="mt-14 flex-col items-center">
            <AppText
              bold={true}
              className="mb-5 text-lg text-text dark:text-dark-text"
            >
              {t('whyUs')}
            </AppText>
            <CircleArrowDown size={30} color={iconColor} />
          </View>
          <View className="mt-12 flex-col items-center">
            <View className="flex-row">
              <Image
                source={require("../assets/images/iconGooglePlay.png")}
                style={{ width: 20, height: 20, marginTop: 2 }}
                contentFit="contain"
              />
              <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
                {t('googlePlay')}
              </AppText>
            </View>
            <Image
              className="h-72 w-72 rounded-2xl border-2 border-stroke dark:border-dark-stroke"
              source={require("../assets/images/googlePlayInstall.png")}
              style={{ width: 250, aspectRatio: 1, borderRadius: 16 }}
              contentFit="contain"
            />
          </View>
          <View className="mt-12 flex-col items-center">
            <View className="flex-row">
              <Image
                source={require("../assets/images/iconAppStore.png")}
                style={{ width: 19, height: 19, marginTop: 4 }}
                contentFit="contain"
              />
              <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
                {t('appStore')}
              </AppText>
            </View>
            <Image
              className="h-72 w-72 rounded-2xl border-2 border-stroke dark:border-dark-stroke"
              source={require("../assets/images/InstallAppStore.png")}
              style={{ width: 250, height: 250, aspectRatio: 1, borderRadius: 16 }}
            />
          </View>
          <View className="mt-12 flex-col items-center">
            <View className="flex-row justify-center">
              <Github color={iconColor} />
              <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
                {t('openSource')}
              </AppText>
            </View>
            <AppText className="w-7/12 text-text dark:text-dark-text">
              {t('openSourceDesc')}
            </AppText>
          </View>
          <View className="mt-12 flex-col items-center">
            <View className="flex-row justify-center">
              <Tv color={iconColor} />
              <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
                {t('noAds')}
              </AppText>
            </View>
            <AppText className="w-7/12 text-text dark:text-dark-text">
              {t('noAdsDesc')}
            </AppText>
          </View>
          <View className="mt-12 flex-col items-center">
            <View className="flex-row justify-center">
              <Database color={iconColor} />
              <AppText className="mb-5 ml-4 text-xl text-text dark:text-dark-text">
                {t('noDataSelling')}
              </AppText>
            </View>
            <AppText className="w-7/12 text-text dark:text-dark-text">
              {t('noDataSellingDesc')}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
