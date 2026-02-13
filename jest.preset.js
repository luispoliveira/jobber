const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  passWithNoTests: true,
  transformIgnorePatterns: ['node_modules/(?!uuid/)'],
};
