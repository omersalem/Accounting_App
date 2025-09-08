module.exports = function (api) {
  api.cache(true);
  const isTest = api.env('test');
  return {
    presets: ['babel-preset-expo'],
    // Enable NativeWind in app builds; disable in tests for Jest stability.
    plugins: isTest ? [] : ['nativewind/babel'],
  };
};