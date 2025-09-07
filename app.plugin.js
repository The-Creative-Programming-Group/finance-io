// Inject core-splashscreen dependency to fix Android resource linking errors for Theme.SplashScreen
// This runs during EAS prebuild and modifies android/app/build.gradle
const {
  withAppBuildGradle,
  createRunOncePlugin,
  WarningAggregator,
} = require("@expo/config-plugins");

const DEP_LINE = 'implementation("androidx.core:core-splashscreen:1.0.1")';

function ensureDependency(contents) {
  // If gradle file isn't available during introspection, just return as-is.
  if (typeof contents !== "string") return contents;
  if (contents.includes(DEP_LINE)) return contents; // already present
  return contents.replace(
    /dependencies\s*\{/m,
    (match) => `${match}\n    ${DEP_LINE}`,
  );
}

const withCoreSplashscreenDependency = (config) =>
  withAppBuildGradle(config, (config) => {
    try {
      const updated = ensureDependency(config.modResults?.contents);
      if (typeof updated === "string") {
        config.modResults.contents = updated;
      } else {
        // During introspection (e.g., EAS Read app config) the file may not exist yet.
        WarningAggregator.addWarningAndroid(
          "core-splashscreen",
          "Skipped adding androidx.core:core-splashscreen; app/build.gradle not available during introspection.",
        );
      }
    } catch (e) {
      WarningAggregator.addWarningAndroid(
        "core-splashscreen",
        `Failed to add androidx.core:core-splashscreen dependency: ${e?.message ?? e}`,
      );
    }
    return config;
  });

// module exp
module.exports = createRunOncePlugin(
  withCoreSplashscreenDependency,
  "with-core-splashscreen-dependency",
  "1.0.0",
);
