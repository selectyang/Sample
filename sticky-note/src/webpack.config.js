var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: path.join(__dirname,"js/app/index.js"),
  output: {
    path: path.join(__dirname,"../public/javascripts"),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,

              use: ["style-loader", "css-loader", "sass-loader"]

      }
    ],
    // loaders:[
    //   {
    //     test: /\.js[x]?$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader?presets[]=es2015&presets[]=react'
    //   },
    // ]
  },

  resolve: {
    alias: {
      jquery: path.join(__dirname,"js/lib/jquery.min.js"),
      module: path.join(__dirname,"js/module"),
      scss: path.join(__dirname,"scss")
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery"
    // }),
    new ExtractTextPlugin("css/index.css"),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })
  ]
}