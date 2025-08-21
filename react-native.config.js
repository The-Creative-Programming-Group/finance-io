// Exclude the 'expo' package from React Native autolinking.
// In SDK 53 managed/EAS builds, RN CLI may incorrectly try to autolink 'expo'
// and generate a legacy import (expo.core.ExpoModulesPackage) in PackageList.java.
// This config prevents RN CLI from autolinking 'expo' so Expo Autolinking can handle modules correctly.

/* eslint-env node */

module.exports = {
  dependencies: {
    expo: {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
