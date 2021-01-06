const sensors = require('sa-sdk-javascript')
sensors.init({
  // 神策系统配置
  server_url: 'https://shence.dgg.cn:6443/sa?project=default', // 数据接收地址
  is_track_single_page: true, // 单页应用页面浏览事件采集(url改变就触发)
  show_log: false, // 控制台显示数据开关
  heatmap: {
    // 热图设置 default开启 not_collect关闭（详细配置解释看官方文档）
    clickmap: 'default', // 点击热图，收集点击事件
    scroll_notice_map: 'default', // 视区热图，收集页面区域停留时间
  },
})
window.sensors = sensors
module.exports = sensors
