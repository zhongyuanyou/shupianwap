<template>
  <div class="bannerSwipe">
    <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="#FFFFFF">
      <sp-swipe-item v-for="(item, index) in imglist" :key="index">
        <router-link :to="item.url"><img :src="item.img" alt="" /></router-link>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  components: { [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
  props: {
    imglist: {
      type: Array,
      default: () => {
        return {
          code: 1,
          url: '',
          img: require('~/assets/spreadImages/businessChange/busi_img_gsbgbanner01.jpg'),
        }
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.bannerSwipe {
  width: 100%;
  .my-swipe .sp-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 392px;
    text-align: center;
    > a {
      > img {
        width: 100%;
      }
    }
  }
  /deep/.sp-swipe__indicators {
    bottom: 96px;
  }
}
</style>
