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
                '@layout-header-background': 'transparent',
                '@layout-header-color': '@primary-color'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};