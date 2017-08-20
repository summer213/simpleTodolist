var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
module.exports = {
  entry:  './src/index.js',
  output: {
    path: __dirname+'/build/dist/',
    filename: 'bundle.js'
  },
    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        // exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },{
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version","firefox 15"]}'
      },
      // {
      //   test: /\.sass/,
      //   loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      // },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },{
        test: /.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};