const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

function getLessVariables (file) {
  var themeContent = fs.readFileSync(file, 'utf-8')
  var variables = {}
  themeContent.split('\n').forEach(function (item) {
    if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
      return
    }
    var _pair = item.split(':')
    if (_pair.length < 2) return
    var key = _pair[0].replace('\r', '').replace('@', '')
    if (!key) return
    var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
    variables[key] = value
  })
  return variables
}

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/app/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader'
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: true,
              modifyVars: getLessVariables('./app/theme/theme.less')
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
}