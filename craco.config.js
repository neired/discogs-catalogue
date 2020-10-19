const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#AF4FFA',
                '@card-background': 'transparent',
                '@breadcrumb-last-item-color': '@primary-color',
                '@layout-header-background': '#000',
                '@layout-header-color': '@primary-color',
                '@shadow-color': 'rgba(255, 255, 255, 0.45)'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};