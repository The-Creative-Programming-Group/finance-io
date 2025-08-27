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
                "Use <AppText> instead of <Text>. The <AppText> component is located in 'components/ui/AppText'. We are using this because it has a custom font and some other features.",
            },
            {
              name: "expo-image",
              importNames: ["Image"],
              message:
                "Use <AppImage> instead of <AppImage>. The <AppImage> component is located in 'components/ui/AppImage'. We are using this because it can be styled with NativeWind and has some other features.",
            },
          ],
        },
      ],

      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='Text']",
          message:
            "Use <AppText> instead of <Text>. The <AppText> component is located in 'components/ui/AppText'. We are using this because it has a custom font and some other features.",
        },
        {
          selector: "JSXOpeningElement[name.name='Image']",
          message:
            "Use <AppImage> instead of <Image>. The <AppImage> component is located in 'components/ui/AppImage'. We are using this because it can be styled with NativeWind and has some other features.",
        },
      ],
    },
  },

  {
    files: ["src/components/ui/AppText.tsx", "src/components/ui/AppImage.ts"],
    rules: {
      "no-restricted-imports": "off",
      "no-restricted-syntax": "off",
    },
  },

  {
    ignores: ["dist/*"],
  },
]);
