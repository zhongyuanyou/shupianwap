<template>
  <div v-if="skillData.length" class="sp-main-box">
    <div class="inner">
      <p class="sp-home-title">
        限时秒杀
        <a class="to-more" href="/activity/seckill"
          >更多 <sp-icon name="arrow"
        /></a>
      </p>
      <sp-swipe
        class="my-swipe"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item
          v-for="(item, index) in skillList"
          :key="index"
          class="my-swiper-item"
        >
          <a
            v-if="item[0] && item[0].materialList"
            href="javascript:void(0)"
            class="swiper-box"
            @click="adJumpHandleMixin(item[0].materialList[0])"
          >
            <img :src="item[0].materialList[0].materialUrl" alt="" />
          </a>
          <a
            v-if="item[1] && item[1].materialList"
            href="javascript:void(0)"
            class="swiper-box"
            @click="adJumpHandleMixin(item[1].materialList[0])"
          >
            <img :src="item[1].materialList[0].materialUrl" alt="" />
          </a>
        </sp-swipe-item>
        <!-- <img
          v-for="(subsidyItem, subIndex) in skillList"
          :key="subIndex"
          :src="subsidyItem.materialList[0].materialUrl"
          alt=""
          srcset=""
          :style="{ width: imgWidth }"
          @click="adJumpHandleMixin(subsidyItem.materialList[0])"
        /> -->
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
  computed: {
    skillList() {
      const arr = new Array(Math.ceil(this.skillData.length / 2)).fill([])
      for (let i = 0; i < arr.length; i++) {
        const index1 = 2 * i
        const index2 = 2 * i + 1
        const item = [this.skillData[index1], this.skillData[index2]]
        arr[i] = item
      }
      return arr
    },
  },
}
</script>

<style scoped lang="less">
.sp-home-title {
  font-weight: 700;
}
.swiper-bn {
  width: 100%;
  height: 231px;
  margin-bottom: 65px;
}
.my-swiper-item {
  padding: 0 20px 20px 20px;
  width: 100%;
  height: 174px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .swiper-box {
    // display: flex;
    // justify-content: space-between;
    width: 49%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
