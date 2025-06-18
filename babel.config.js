module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      "react-native-reanimated/plugin", // Reanimated plugin has to be listed last.
    ],
  };
};
