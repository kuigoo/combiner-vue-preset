const path = require('path');

const isPreview = process.env.VUE_APP_MODE = 'preview';
const previewDevServer = {
  hot: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
  watchContentBase: true,
};

module.exports = {
  css: {
    extract: false,
  },
  devServer: {
    ...(isPreview ? previewDevServer : {}),
  },
  chainWebpack(config) {
    ['css', 'less', 'stylus', 'sass', 'scss'].forEach((rule) => {
      config.module
        .rule(rule)
        .oneOf('vue')
          .use('vue-style-loader')
            .loader('vue-style-loader')
            .tap(options => {
              options.ssrId = true;
              return options;
            })
            .end()
          .end()
        .oneOf('normal')
          .use('vue-style-loader')
            .loader('vue-style-loader')
            .tap(options => {
              options.ssrId = true;
              return options;
            })
            .end()
          .end()
    });
  }
}