const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Allow older packages like reactotron-react-native
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, {
  input: "./global.css",
});
