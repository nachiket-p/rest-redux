const path = require('path')
const fs = require('fs')
var webpack = require('webpack');

module.exports = {
//  context:  path.join(__dirname, '..') ,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        // loader: 'react-hot-loader!babel-loader'
        loaders: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { 
      'rest-redux': path.resolve(__dirname, '..', 'src') 
    },
    // modules: [
    //   path.resolve(__dirname),
    //   path.resolve(__dirname, '..', 'src')
    // ]
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    hot: true
  },
  devtool: 'eval-source-map'
};
