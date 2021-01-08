// 线上求地址 https://shence.dgg.cn:6443/sa?project=production

let currentDo = location.origin
var DGGCONFIG ={
    platform_type: 'WAP', // 类型
    app_name: '测试薯片WAP端', // 名称
    show_log: false, // 打印日志
    server_url:
    currentDo === 'https://shupian.dgg.cn'
      ? 'https://shence.dgg.cn:6443/sa?project=production'
      : 'https://shence.dgg.cn:6443/sa?token=default', // 请求地址
}
