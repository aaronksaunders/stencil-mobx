exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['my-app', 'my-header','my-routes','my-name', 'my-address'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
