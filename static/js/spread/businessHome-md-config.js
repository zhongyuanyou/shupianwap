// 线上求地址 https://shence.dgg.cn:6443/sa?project=production
if (window.currentDo) delete currentDo
let currentDo = location.origin
var DGGCONFIG = {
  platform_type: 'wap端', // 类型
  app_name: 'wap端工商聚合页推广页面', // 名称
  server_url:
    currentDo === 'https://shupian.dgg.cn'
      ? 'https://shence.dgg.cn:6443/sa?project=production'
      : 'https://shence.dgg.cn:6443/sa?token=default', // 请求地址
  show_log: true, // 打印日志
}
