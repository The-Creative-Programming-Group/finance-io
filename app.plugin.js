// Inject core-splashscreen dependency to fix Android resource linking errors for Theme.SplashScreen
// This runs during EAS prebuild and modifies android/app/build.gradle
const { withAppBuildGradle, createRunOncePlugin, WarningAggregator } = require('@expo/config-plugins');

const DEP_LINE = 'implementation("androidx.core:core-splashscreen:1.0.1")';

function ensureDependency(contents) {
  if (contents.includes(DEP_LINE)) return contents; // already present
  return contents.replace(/dependencies\s*\{/m, (match) => `${match}\n    ${DEP_LINE}`);
}

const withCoreSplashscreenDependency = (config) =>
  withAppBuildGradle(config, (config) => {
    try {
      config.modResults.contents = ensureDependency(config.modResults.contents);
    } catch (e) {
      WarningAggregator.addWarningAndroid(
        'core-splashscreen',
        `Failed to add androidx.core:core-splashscreen dependency: ${e?.message ?? e}`
      );
    }
    return config;
  });

  // module exp
module.exports = createRunOncePlugin(
  withCoreSplashscreenDependency,
  'with-core-splashscreen-dependency',
  '1.0.0'
);
