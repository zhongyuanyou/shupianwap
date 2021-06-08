/*
 * @Author: majinghe
 * @Date: 2021-05-27
 * @Description: 基于西瓜视频封装视频组件.
 * @Document: http://v2.h5player.bytedance.com/config/
 */
import SpVideo from './src/component'

SpVideo.install = (Vue) => {
  Vue.component(SpVideo.name, SpVideo)
}

export default SpVideo
