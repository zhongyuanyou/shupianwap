<template>
  <div v-if="swiperData.length" class="swiper-bn">
    <sp-swipe
      class="my-swipe"
      :autoplay="autoplay"
      :show-indicators="indicators"
    >
      <sp-swipe-item v-for="(item, index) in swiperData" :key="index">
        <a
          href="javascript:void(0)"
          class="swiper-box"
          @click="adJumpHandleMixin(item.materialList[0])"
        >
          <img
            :src="item.materialList[0].materialUrl + $ossImgSet(750, 230)"
            alt=""
          />
        </a>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, swipeItem } from '@chipspc/vant-dgg'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
  },
  mixins: [adJumpHandle],
  props: {
    swiperData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      autoplay: 5000, // 切换间隔
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
