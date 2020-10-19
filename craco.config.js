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
                '@secondary-color': '#FFFFFF',
                '@card-background': 'transparent',
                '@breadcrumb-separator-color': '@primary-color',
                '@layout-header-background': '#000',
                '@layout-header-height': '110px',
                '@layout-header-padding': '12px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};