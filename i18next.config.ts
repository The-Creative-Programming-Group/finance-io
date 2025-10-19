import { defineConfig } from "i18next-cli";

// Used in ./scripts/generate-i18n-resources.js
export const locales = [
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
  "th",
  "id",
  "vi",
  "sw",
];

// Used in ./scripts/generate-i18n-resources.js
export const namespaces = ["common", "settings"];

export default defineConfig({
  locales,
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "localization/{{language}}/{{namespace}}.json",
  },
});
