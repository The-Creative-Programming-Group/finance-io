import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';

// Import all translation files
import en from '../localization/en.json';
import fr from '../localization/fr.json';
import es from '../localization/es.json';
import it from '../localization/it.json';
import fa from '../localization/fa.json';
import zh from '../localization/zh.json';
import tr from '../localization/tr.json';
import ru from '../localization/ru.json';
import de from '../localization/de.json';
import ar from '../localization/ar.json';
import ja from '../localization/ja.json';
import ko from '../localization/ko.json';
import ur from '../localization/ur.json';
import ps from '../localization/ps.json';
import hi from '../localization/hi.json';
import pt from '../localization/pt.json';

const LANGUAGE_KEY = 'finance_io_language';
const HAS_LAUNCHED_KEY = 'finance_io_first_launch';
const DEVICE_LANG_KEY = 'finance_io_device_lang';

// All available languages in the app
const resources = {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
    it: { translation: it },
    fa: { translation: fa }, // Dari (Persian)
    zh: { translation: zh }, // Chinese
    tr: { translation: tr }, // Turkish
    ru: { translation: ru }, // Russian
    de: { translation: de }, // German
    ar: { translation: ar }, // Arabic
    ja: { translation: ja }, // Japanese
    ko: { translation: ko }, // Korean
    ur: { translation: ur }, // Urdu
    ps: { translation: ps }, // Pashto
    hi: { translation: hi }, // Hindi
    pt: { translation: pt }, // Portuguese
} as const;

type LanguageKey = keyof typeof resources;

// Get the device's locale for initial language
const getDeviceLanguage = (): LanguageKey => {
    try {
        const locale = Localization.getLocales()?.[0]?.languageCode as string | undefined;
        if (!locale) return 'en';
    } catch (error) {
        console.error('Error detecting device language:', error);
        return 'en'; // Default to English on error
    }
};

// Start with device language but prepare to update it immediately after initialization
const deviceLanguage = getDeviceLanguage();

// Initialize i18next with device language as starting point
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: deviceLanguage, // Start with device language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false, // Recommended for React Native
        },
    });

// Store the current device language
(async () => {
    try {
        // Store current device language for future comparison
        await SecureStore.setItemAsync(DEVICE_LANG_KEY, deviceLanguage);
    } catch (error) {
        console.error('Error storing device language:', error);
    }
})();

export default i18n; 