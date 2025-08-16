// https://docs.expo.dev/guides/using-eslint/

const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-native",
              importNames: ["Text"],
              message:
                "Use <AppText> instead of <Text>. The <AppText> component is located in 'components/AppText'. We are using this because it has a custom font and some other features.",
            },
          ],
        },
      ],

      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='Text']",
          message:
            "Use <AppText> instead of <Text>. The <AppText> component is located in 'components/AppText'. We are using this because it has a custom font and some other features.",
        },
      ],
    },
  },

  {
    files: ["src/components/AppText.tsx"],
    rules: {
      "no-restricted-imports": "off",
      "no-restricted-syntax": "off",
    },
  },

  {
    ignores: ["dist/*"],
  },
]);
