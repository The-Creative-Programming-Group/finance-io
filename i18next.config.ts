import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: [
    "ar",
    "de",
    "en",
    "es",
    "fa",
    "fr",
    "hi",
    "it",
    "ja",
    "ko",
    "ps",
    "pt",
    "ru",
    "tr",
    "ur",
    "zh",
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "localization/{{language}}.json",
  },
});
