<template>
  <div v-if="skillData.length" class="sp-main-box">
    <div class="inner">
      <p class="sp-home-title">
        限时秒杀
        <a class="to-more" href="/category">更多 <sp-icon name="arrow" /></a>
      </p>
      <sp-swipe
        class="my-swipe"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item v-for="(item, index) in skillData" :key="index">
          <a
            href="javascript:void(0)"
            class="swiper-box"
            @click="adJumpHandleMixin(item.materialList[0])"
          >
            <img :src="item.materialList[0].materialUrl" alt="" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, swipeItem, Icon } from '@chipspc/vant-dgg'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Icon.name]: Icon,
  },
  mixins: [adJumpHandle],
  props: {
    skillData: {
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
