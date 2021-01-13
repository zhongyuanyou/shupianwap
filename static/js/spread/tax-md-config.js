// 线上求地址 https://shence.dgg.cn:6443/sa?project=production

let currentDo = location.origin
var DGGCONFIG = {
  platform_type: '专利wap端', // 类型
  app_name: 'Wap端税务筹划推广页', // 名称
  server_url:
    currentDo === 'https://mjy.dgg.cn'
      ? 'https://shence.dgg.cn:6443/sa?project=production'
      : 'https://shence.dgg.cn:6443/sa?token=default', // 请求地址
  show_log: false, // 打印日志
}
