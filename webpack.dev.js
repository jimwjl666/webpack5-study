const { merge }= require('webpack-merge');
const common = require('./webpack.common')
const devConfig = merge(common, {
  mode:'development',
  devtool: 'inline-source-map',
  cache: {
    // 默认缓存到 node_modules/.cache/webpack 中
    type:'filesystem'
    // 也可以自定义缓存目录
    // cacheDirectory:path.resolve(__dirname,'node_modules/.cac/webpack')
  },
 
  devServer: {
    contentBase: './dist',
    compress:true,
    port:9000,
    // 模块热替换
    hot:true,
    // 禁用页面热重载
    hotOnly: true
  }
})
module.exports = devConfig