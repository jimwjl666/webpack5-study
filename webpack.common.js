const path = require('path')
const webpack = require('webpack')
const { ProvidePlugin } = webpack
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/* const {CleanWebpackPlugin} = require('clean-webpack-plugin') 已过时
const { GenerateSW } = require('workbox-webpack-plugin') */
/* const { truncate } = require('lodash') */
module.exports = {
  entry:{
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        //仅仅将loader应用在实际需要将其转换换的模块
        include: path.resolve(__dirname,'src'),
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.js$/,
         //仅仅将loader应用在实际需要将其转换换的模块
         include: path.resolve(__dirname,'src'),
        use: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        //指定输出目录
        generator: {
          filename:'fonts/[hash][ext][query]',
          publicPath:'/'
        }
      },
      /* webpack 5以后的资源配置方式 */
      {
        test:/\.(png|gif|jpg|jpeg)$/i,
        type: 'asset/resource',
        parser:{ 
          // 小于8k，将会视为inline模块，否则视为resource类型
          dataUrlCondition:{
             maxSize:8*1024
           }
         },
        //指定输出目录
        generator: {
          filename:'images/[hash][ext][query]',
          publicPath:'/'
        }
      }
    ],
    
  },
  //优化
  //分离第三方模块
  optimization:{
    // moduleIds: 'deterministic',
    // 提取公共依赖
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 将从node_modules中引用的模块都打入到dist/js/lib中
          /* test: /[lodash]/, */
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
              const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
          filename: "js/lib/[name].js"
        }
      }
    },
    //运行时模块, 会创建一个在所有chunk之间共享的运行时文件 ，比如import('abc').then(res=>{}) 属于运行时代码，
    // 将运行时代码抽离出来有助于修改了运行时代码主js的hash不会改变，缓存不会失效。
    runtimeChunk:'single'
  },
  // 外部化, 一般用于打包library
  // externals:{
  //   lodash: {
  //     commonjs:'lodash',
  //     amd: 'lodash',
  //     root: '_'
  //   }
  // },

  plugins: [
   /*  new CleanWebpackPlugin(), 已过时*/
    new HtmlWebpackPlugin(),
    new WebpackCdnPlugin({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'dist/vue.runtime.min.js'
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'dist/vue-router.min.js'
        },
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'dist/vuex.min.js'
        }
      ],
      publicPath: '/node_modules'
    })
    // 前提，先安装模块
    /* new ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
    }), */
    // 依赖分析模块
    //new BundleAnalyzerPlugin()
    /* new GenerateSW({ 
     // importWorkboxFrom:'local', 报错，提示不允许配置
      skipWaiting: true, // 跳过waiting声明周期
      clientsClaim:true, // 在active 后是否应该立即控制现有客户端
      runtimeCaching:[
        {
          // NetworkFirst : 网络优先
          // CacheFirst: 优先考虑缓存，如果缓存没命中，才会去请求api
          // fastest: 两个同时进行，哪个快拿哪个，
          // CachOnly 只拿缓存 
          // NetworkOnly:只使用正常的网络请求
          // StaleWhileRevalidate
          urlPattern:new RegExp('^http://'),
          handler: 'NetworkFirst', // NetworkFirst  cacheFirst fastest cacheonly networkonly
          options:{
            cacheableResponse:{
              statuses:[200]
            }
          }
        }
      ]
    }) */
  ],
  output:{
    /* filename:'[name].[contenthash].js', */
    filename:'[name].[contenthash].js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/',
    clean: true,
  },
  experiments: {
    // 顶级await
    topLevelAwait: true
  }
}