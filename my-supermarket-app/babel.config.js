module.exports = function (api) {
  const isTest = api.env('test');
  return {
    presets: ['babel-preset-expo'],
    // Disable NativeWind plugin in Jest to avoid transform issues
    plugins: isTest ? [] : ['nativewind/babel'],
  };
};