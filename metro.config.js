const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// If you are not using SVGs, you can remove SVG-specific lines
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts.push('svg');

// Optional: Prevent parsing nested react-native from other node_modules
defaultConfig.resolver.blacklistRE = /node_modules\/.*\/node_modules\/react-native\/.*/;

module.exports = mergeConfig(defaultConfig, {
  watchFolders: [path.resolve(__dirname, 'node_modules')],
});
