const htmlWebpack = require('html-webpack-plugin');
const cssExtract = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: './js/bundle.js', //输出不必加上dist会自动生成dist文件夹
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        //没有cssExtract的loader无法输出main.css
        use: [cssExtract.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpack({
      filename: './index.html',
      template: './html/index.ejs'
    }),
    //如果填写了路径会变成chunk,并且仍旧是用js插入link,虽然css是打包出来了
    new cssExtract({ filename: 'main.css' }),
    new htmlWebpack({
      filename: './illust.html',
      template: './html/illust.ejs'
    }),
    new htmlWebpack({
      filename: './discover.html',
      template: './html/discover.ejs'
    }),
    new htmlWebpack({
      filename: './video.html',
      template: './html/video.ejs'
    }),
    new htmlWebpack({
      filename: './register.html',
      template: './html/register.ejs'
    }),
    new htmlWebpack({
      filename: './login.html',
      template: './html/login.ejs'
    }),
    new htmlWebpack({
      filename: './novel.html',
      template: './html/novel.ejs'
    }),
    new htmlWebpack({
      filename: './coser.html',
      template: './html/coser.ejs'
    })
  ]
};
