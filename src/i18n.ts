import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { resources, namespaces } from "./i18n-resources";

const LANGUAGE_KEY = "finance_io_language";
const HAS_LAUNCHED_KEY = "finance_io_first_launch";
const DEVICE_LANG_KEY = "finance_io_device_lang";

const normalizeLang = (code?: string): string => {
  const c = (code || "en").toLowerCase();
  if (c === "in") return "id"; // legacy Android code for Indonesian
  return c;
};

// Get the device's locale for initial language
const getDeviceLanguage = (): string => {
  try {
    const locale = Localization.getLocales()?.[0]?.languageCode as
      | string
      | undefined;
    if (!locale) return "en";
    return normalizeLang(locale);
  } catch (error) {
    console.error("Error detecting device language:", error);
    return "en"; // Default to English on error
  }
};

// Start with the device language but prepare to update it immediately after initialization
const deviceLanguage = getDeviceLanguage();

// Initialize i18next with device language as a starting point
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, // Start with the device language
  fallbackLng: "en",
  defaultNS: "common", // Set default namespace
  ns: [...namespaces], // All available namespaces
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // Recommended for React Native
  },
});

// Note: Storing device language is handled at runtime in
// `languageService.initializeLanguage()` to avoid executing
// native code during the bundling/build step.

export default i18n;
