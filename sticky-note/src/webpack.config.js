var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname,"js/app/index.js"),
  output: {
    path: path.join(__dirname,"../public/javascripts"),
    filename: 'index.js'
  },
  // module: {
  //   loaders:[
  //     {
  //       test: /\.js[x]?$/,
  //       exclude: /node_modules/,
  //       loader: 'babel-loader?presets[]=es2015&presets[]=react'
  //     },
  //   ]
  // },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.common.js'
  //   }
  // }
}