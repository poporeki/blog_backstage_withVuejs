const webpack = require('webpack');

// const localUrl = 'http://localhost:3000';
// const proUrl = 'https://v.yansk.cn';
// const publicPath = process.env.NODE_ENV === 'production' ? proUrl : localUrl;

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
}