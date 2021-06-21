/*
 * @Author: majinghe
 * @Date: 2021-05-27
 * @Description: 基于 video.js 进行封装视频组件.
 * @Document: https://docs.videojs.com/
 */
import SpVideo from './src/component'

SpVideo.install = (Vue) => {
  Vue.component(SpVideo.name, SpVideo)
}

export default SpVideo
