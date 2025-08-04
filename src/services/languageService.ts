import * as SecureStore from 'expo-secure-store';
import * as Localization from 'expo-localization';
import i18n from '~/i18n';

const LANGUAGE_KEY = 'finance_io_language';
const HAS_LAUNCHED_KEY = 'finance_io_first_launch';
const DEVICE_LANG_KEY = 'finance_io_device_lang';

// Get the device's locale 
const getDeviceLanguage = (): string => {
    try {
        const locale = Localization.getLocales()?.[0]?.languageCode;
        if (!locale) return 'en';
        return locale;
    } catch (error) {
        console.error('Error detecting device language:', error);
        return 'en'; // Default to English on error
    }
};

export const languageService = {
    // Get the stored language from SecureStore
    getStoredLanguage: async (): Promise<string | null> => {
        try {
            const lang = await SecureStore.getItemAsync(LANGUAGE_KEY);
            return lang;
        } catch (error) {
            console.error('Error reading language from storage:', error);
            return null;
        }
    },

    // Check if device language has changed since last launch
    hasDeviceLanguageChanged: async (): Promise<boolean> => {
        try {
            const currentDeviceLang = getDeviceLanguage();
            const storedDeviceLang = await SecureStore.getItemAsync(DEVICE_LANG_KEY);

            // If stored device language doesn't match current, it has changed
            const hasChanged = storedDeviceLang !== null && storedDeviceLang !== currentDeviceLang;

            // Update the stored device language
            // Ensure currentDeviceLang is a string before storing
            const deviceLangString = typeof currentDeviceLang === 'string' ? currentDeviceLang : 'en';
            await SecureStore.setItemAsync(DEVICE_LANG_KEY, deviceLangString);

            return hasChanged;
        } catch (error) {
            console.error('Error checking device language change:', error);
            return false;
        }
    },

    // Set a new language and store it in SecureStore
    setLanguage: async (language: string): Promise<void> => {
        try {
            // Ensure language is a string before storing
            const languageString = typeof language === 'string' ? language : 'en';
            await SecureStore.setItemAsync(LANGUAGE_KEY, languageString);
            await i18n.changeLanguage(languageString);
        } catch (error) {
            console.error('Error storing language:', error);
        }
    },

    // Reset language preference to device language
    resetToDeviceLanguage: async (): Promise<void> => {
        try {
            const deviceLang = getDeviceLanguage();
            // Store current device language
            const deviceLangString = typeof deviceLang === 'string' ? deviceLang : 'en';
            await SecureStore.setItemAsync(DEVICE_LANG_KEY, deviceLangString);
            // Set as current language
            await languageService.setLanguage(deviceLangString);
        } catch (error) {
            console.error('Error resetting to device language:', error);
        }
    },

    // Clear all language preferences (for testing)
    clearLanguagePreferences: async (): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync(LANGUAGE_KEY);
            await SecureStore.deleteItemAsync(HAS_LAUNCHED_KEY);
            await SecureStore.deleteItemAsync(DEVICE_LANG_KEY);
        } catch (error) {
            console.error('Error clearing language preferences:', error);
        }
    },

    // Initialize language from storage or use device default
    initializeLanguage: async (): Promise<void> => {
        try {
            // Get current device language
            const currentDeviceLang = getDeviceLanguage();

            // Check if device language changed since last launch
            const deviceLangChanged = await languageService.hasDeviceLanguageChanged();

            // Check if this is first launch
            const hasLaunched = await SecureStore.getItemAsync(HAS_LAUNCHED_KEY);
            const firstLaunch = hasLaunched === null;

            // Get any stored explicit language preference
            const storedLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY);

            if (firstLaunch) {
                // On first launch, set the flag for next time
                await SecureStore.setItemAsync(HAS_LAUNCHED_KEY, 'true');

                // Store the current device language
                const deviceLangString = typeof currentDeviceLang === 'string' ? currentDeviceLang : 'en';
                await SecureStore.setItemAsync(DEVICE_LANG_KEY, deviceLangString);

                // Use device language
                await i18n.changeLanguage(deviceLangString);
            }
            else if (deviceLangChanged && !storedLanguage) {
                // If device language changed AND user hasn't explicitly set a language preference,
                // update to new device language
                const deviceLangString = typeof currentDeviceLang === 'string' ? currentDeviceLang : 'en';
                await i18n.changeLanguage(deviceLangString);
            }
            else if (storedLanguage) {
                // User has explicitly set a language preference, use that
                await i18n.changeLanguage(storedLanguage);
            }
            else {
                // No stored preference, use device language
                const deviceLangString = typeof currentDeviceLang === 'string' ? currentDeviceLang : 'en';
                await i18n.changeLanguage(deviceLangString);
            }
        } catch (error) {
            console.error('Error initializing language:', error);
        }
    },
}; 