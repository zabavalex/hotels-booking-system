const path = require('path');
const craco = require('@craco/craco');
const CompressionPlugin = require('compression-webpack-plugin');
const set = require('lodash/set');
const fs = require('fs');


module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // console.log(webpackConfig);
      // process.exit(0);

      // Alias @
      set(webpackConfig, ['resolve', 'alias', '@'], path.resolve(__dirname, `${paths.appSrc}/`));

      // Gz static
      if (env === 'production') {
        craco.addPlugins(webpackConfig, [
          new CompressionPlugin({
            // Кроме конфига
            exclude: /\/config.*/,
          }),
        ]);
      }

      return webpackConfig;
    },
  },
};
