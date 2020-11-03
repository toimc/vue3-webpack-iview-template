/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 入口
  entry: {
    main: './examples/main'
  },
  // 输出
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    alias: {
      iview: '../../src/index',
      vue: 'vue/dist/vue.esm-bundler.js'
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  devServer: {
    disableHostCheck: true,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FriendlyErrorsPlugin(),
    new WebpackBar()
  ]
})
