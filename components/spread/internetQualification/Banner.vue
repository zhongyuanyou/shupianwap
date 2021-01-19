<template>
  <div>
    <div class="my-component">
      <sp-swipe class="banner-swipe" :loop="true" autoplay="5000">
        <sp-swipe-item v-for="(item, index) in images" :key="index">
          <sp-image fit="cover" :src="item" />
        </sp-swipe-item>
      </sp-swipe>
    </div>
  </div>
</template>

<script>
import { Image, Swipe, SwipeItem } from '@chipspc/vant-dgg'

export default {
  name: 'Banner',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return [
          'https://cdn.shupian.cn/sp-pt/wap/images/5xqt8uvktwo0000.png',
          'https://cdn.shupian.cn/sp-pt/wap/images/b4ylzmobsxc0000.png',
        ]
      },
    },
  },
  data() {
    return {
      current: 0, // banner下标
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  height: 392px;
  .banner-swipe {
    height: 392px;
  }
}
</style>
