<template>
  <div class="banner">
    <sp-swipe :autoplay="3000" @change="onChange">
      <sp-swipe-item v-for="(item, index) in images" :key="index">
        <sp-image
          fit="cover"
          :src="`${item}?x-oss-process=image/resize,m_fill,w_750,h_520,limit_0`"
        />
      </sp-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ images.length }}
        </div>
      </template>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
import { GOODSDETAIL } from '~/config/constant'
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
      default: () => [],
    },
  },
  data() {
    return {
      current: 0, // banner下标
      GOODSDETAIL, // 详情默认图片
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  ::v-deep .sp-swipe {
    width: 100%;
    height: 520px;
    /*background-color: #999;*/
    overflow: hidden;
    position: relative;
    margin-top: -88px;
    ::v-deep .sp-swipe-item {
      height: 520px;
    }
    ::v-deep .sp-image {
      height: 520px;
      width: 100%;
      > img {
        width: 750px;
        height: 520px;
        display: block;
        object-fit: fill !important;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 24px;
      bottom: 24px;
      padding: 0 28px;
      height: 44px;
      line-height: 44px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      background: #000000;
      opacity: 0.4;
      border-radius: 24px;
    }
  }
}
</style>
