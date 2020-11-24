<template>
  <div class="swiper-bn">
    <sp-swipe
      class="my-swipe"
      :autoplay="autoplay"
      :show-indicators="indicators"
    >
      <sp-swipe-item v-for="(item, index) in swiperData" :key="index">
        <a href="javascript:void(0);" class="swiper-box">
          <img :src="item.icon" alt="" />
        </a>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, swipeItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
  },
  props: {
    swiperData: {
      type: Array,
      default: () => {
        return [
          {
            icon: require('~/assets/temporary/home/bn.png'),
          },
          {
            icon: require('~/assets/temporary/home/bn.png'),
          },
        ]
      },
    },
  },
  data() {
    return {
      autoplay: 3000, // 切换间隔
      indicators: false, // 是否需要指示器
    }
  },
}
</script>

<style scoped lang="less">
.swiper-bn {
  width: 100%;
  height: 231px;
  overflow: hidden;
  margin-bottom: 65px;
  .swiper-box {
    display: block;
    width: 100%;
    height: 230px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
