const path = require('path');
const webpack = require('webpack');
const fs = eval('require("fs")')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  module: {
    rules: [
      {
        test: /\.less$/,
        enforce: 'post',
        include: path.resolve(__dirname, './src/css'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        //   exclude: /node_modules/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        enforce: 'post',
        use: [
          {
            loader: 'babel-loader', options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],

            }
          }

        ]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.less', '.html'],
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: './',
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new CopyPlugin({
    patterns: [

      { from: "./images", to: "./images" }
    ],
  })

  ],
  
  devServer: {
    static: path.resolve(__dirname, './build'),
    historyApiFallback: true,
    port: 80,
    allowedHosts: "all",
    https: true,
    proxy: {
      '/api/v1/login': {
        target: 'xxxxs',
        withCredentials: true,
        secure: false,
        changeOrigin: true,
        onProxyReq: function (proxyReq) {
        //  proxyReq.setHeader("Access-Control-Allow-Origin", "*");
        //  proxyReq.setHeader("Origin", "*");
         // proxyReq.setHeader("Cookie", "session-id=72d5411df8ab3b01fadfb0e192e3c1ecdde9e2218d8c7be9e829cd8572aaadc11ff4c4a2c1ebb3a7e75ba5a786939a9d4861aeecf598e59b9b5a4dc9611cb30b");
        },
        
      },
   ∂
    
    }
  }
};


