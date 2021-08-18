'use strict'

const path = require('path')

const BASE = require('./config/index.js')
const NODE_ENV = process.env.NODE_ENV
const baseUrl = BASE.baseURL
console.log('baseUrl1', baseUrl)
const ossUrl = BASE.ossUrl
const bablePlugin = [
  [
    'import',
    {
      libraryName: '@chipspc/vant-dgg',
      style: (name) => `${name}/style/less`,
    },
    '@chipspc/vant-dgg',
  ],
]
if (NODE_ENV === 'production') {
  bablePlugin.push('transform-remove-console')
}
module.exports = {
  telemetry: false,
  server: {
    port: 3001, // default: 3001
    host: 'localhost', // default: localhost,
  },
  env: {
    DGG_SERVER_ENV: process.env.DGG_SERVER_ENV,
  },
  head: {
    title: '薯片企服-公司注册商标专利交易查询申请法律咨询服务平台',
    keywords:
      '企业服务, 商标注册，法律咨询，会计代理，代缴社保，商标查询，企查查，天眼企服',
    description:
      '薯片企服是成都薯片科技有限公司旗下自研可信企业服务平台，薯片企服依托智能科技，传递价值生意，致力于为全类型，各阶段的企业及个人提供：工商服务、会计代理、财税咨询、知识产权代理、资质许可证办理咨询、品牌设计、IT/软件、营销推广、人事社保代理等多品类的线上服务。',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'full-screen',
        content: 'true',
      },
      {
        name: 'x5-fullscreen',
        content: 'true',
      },
      {
        name: '360-fullscreen',
        content: 'true',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://webapi.amap.com/maps?v=1.4.4&key=5111f49d979a509f1e96420a1b456ff4',
      },
      {
        src: '/js/sppt-mdweb-sdk-conf.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
        defer: 'defer',
      },
      {
        src: 'https://cdn.shupian.cn/sppt/md/sppt-mdweb-sdk.min.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
        defer: 'defer',
      },
      {
        src: '/js/flexible.js',
        ssr: false,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      // {
      //   src: 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
      //   ssr: false,
      //   type: 'text/javascript',
      //   charset: 'utf-8',
      // },
      // {
      //   src:
      //     'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.18.js',
      //   ssr: false,
      //   type: 'text/javascript',
      //   charset: 'utf-8',
      // },
      // {
      //   src:
      //     'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js',
      //   ssr: false,
      //   type: 'text/javascript',
      //   charset: 'utf-8',
      // },
    ],
  },
  loading: { color: '#4974F5' },
  css: [
    'assets/css/reset.css',
    'assets/icons/iconfont.css',
    'assets/iconsNew/iconfont.css',
    'assets/icons630/iconfont.css',
    'assets/styles/reset-vant.less',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    'vant/lib/index.css',
    '@fe/sp-ui-mobile/lib/index.css',
    'video.js/dist/video-js.min.css',
  ],
  styleResources: {
    less: 'assets/styles/variables.less',
  },
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/router', ssr: false },
    { src: '@/plugins/my-icon', ssr: true },
    { src: '@/plugins/vconsole', ssr: false },
    { src: '@/plugins/app-sdk', ssr: false },
    { src: '@/plugins/lazyload', ssr: true },
    { src: '@/plugins/oss', ssr: true },
    { src: '@/plugins/install-components', ssr: false },
    { src: '@/plugins/directive.js', ssr: false },
    { src: '@/plugins/vue-quill-editor', ssr: false },
    { src: '@/plugins/vue-prototype', ssr: false },
    { src: '@/plugins/clear-emoij', ssr: false },
    { src: '@/plugins/echarts', ssr:false },
    { src: '@/plugins/sp-api', ssr: false },
    { src: '@/plugins/echarts', ssr: false },
  ],
  router: {
    middleware: 'appDock',
  },
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // '@nuxtjs/sentry',
    '@nuxtjs/style-resources',
    ['cookie-universal-nuxt', { parseJSON: true }],
  ],
  // sentry: {
  //   dsn: 'https://7b965c0e5d6d40d3a9b97db6ff8e3f7f@dsentry.shupian.cn/8',
  //   config: {
  //     release: '1.0.0',
  //   },
  //   tracing: true,
  // },
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: baseUrl, // 只代理了client的请求,没有代理Server端
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      // 如果不想将所有接口都指向/api目录，就需要进行如下配置
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      },
    },
    '/ossapi': {
      target: ossUrl, // 只代理了client的请求,没有代理Server端
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      // 如果不想将所有接口都指向/api目录，就需要进行如下配置
      pathRewrite: {
        '^/ossapi': '/', // 把 /ossapi 替换成 /
      },
    },
    '/cdnapi': {
      target: 'https://cdn.shupian.cn', // 只代理了client的请求,没有代理Server端
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      // 如果不想将所有接口都指向/api目录，就需要进行如下配置
      pathRewrite: {
        '^/cdnapi': '/', // 把 /ossapi 替换成 /
      },
    },
    '/gdmap': {
      target: 'https://restapi.amap.com', // 高德地图代理
      secure: false,
      changeOrigin: true, // 表示是否跨域
      logLevel: 'debug',
      pathRewrite: {
        '^/gdmap': '/',
      },
    },
  },
  build: {
    transpile: [/vant.*?less/],
    vendor: ['nativeshare'],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 100,
          minPixelValue: 2,
          propWhiteList: [],
          exclude: /(node_modules)/,
        },
      },
      preset: {
        browsers: ['Android >= 4.0', 'iOS >= 7'],
      },
    },
    babel: {
      plugins: bablePlugin,
    },
    extractCSS: { ignoreOrder: true },
    loaders: {
      less: {
        // VantUI 定制主题配置
        javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './assets/styles/vant.var.less'
          )}";`,
        },
      },
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      if (ctx.isClient) {
        if (NODE_ENV === 'development') {
          config.devtool = 'cheap-module-eval-source-map'
        } else {
          config.devtool = 'hidden-source-map'
        }
      }
    },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
}
