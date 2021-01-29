var SPPTMDCONFIG = {
  platform_type: "Web", // 类型
  app_name: "薯片WAP", // 名称
  server_url: window.location.href === 'https://m.shupian.com'
    ? 'https://shence.dgg.cn:6443/sa?project=product'
    : 'https://shence.dgg.cn:6443/sa?project=default', // 请求地址, // 数据接收地址, // 请求地址
  show_log: true, // 打印日志
  heatmap: {
    //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    clickmap: "not_collect",
  }
};
