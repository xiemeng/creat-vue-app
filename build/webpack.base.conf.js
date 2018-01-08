var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack");

var plugins = [//设置全局--手动配置
    new webpack.ProvidePlugin({
      axios: 'axios'//axios代替ajax
      // $:'jquery'
    })
];

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const vuxLoader = require('vux-loader')

let  webpackConfig= {
  entry: {//babel-polyfill在浏览器低版本上不显示时安装这个然后在此处添加这个就好了
    app: ["babel-polyfill",'./src/main.js']

  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api'),//设置全局路径，比如'../../api/account' 等同于 'api/account'
      'components': resolve('src/components'),//同上
      'assets':resolve('src/assets'),
      'service':resolve('src/service'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1,//默认是其他数字，这里改1，图片不会被改成base64位编码----手动配置
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 100000,//默认是其他数字，这里改1，字体不会被改成base64位编码----手动配置
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  } ,
  plugins:plugins
}
module.exports = vuxLoader.merge(webpackConfig, {//vux的--手动配置
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style',{//progress-bar:进度条 duplicate-style：
     name: 'less-theme',
     path: 'src/theme.less'
  }]
})

