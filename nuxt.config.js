'use strict';
module.exports = {
  srcDir: 'client/',
  css: [],
  head: {
    titleTemplate: '%s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Eggjs-Nuxt-SSR' },
    ],
  },
  loading: {
    color: '#409EFF',
    failedColor: '#F56C6C',
    height: '2px',
  },
  plugins: [],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
  },
};
