<template>
  <div class="banner-swiper">
    <div class="banner-img">
      <sp-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <sp-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <nuxt-link :to="{ name: image.url }">
            <sp-image :src="image.img" fit="cover"
          /></nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  props: {
    bannerImages: {
      type: Array,
      default: () => {
        return [
          {
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/92ccqbb36mg0000.jpg',
          },
          {
            url: '',
            img: 'https://cdn.shupian.cn/sp-pt/wap/fzcndei5exs0000.jpg',
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.banner-swiper {
  .banner-img {
    /deep/.my-swipe .sp-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 392px;
      text-align: center;
      img {
        width: 100%;
        height: 392px;
      }
    }
  }
}
</style>
