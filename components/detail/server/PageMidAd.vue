<template>
  <div v-if="adList.length" class="ad_area">
    <sp-swipe :autoplay="3000">
      <sp-swipe-item v-for="(item, index) in adList" :key="index">
        <a
          href="javascript:void(0)"
          @click="adJumpHandleMixin(item.materialList[0])"
        >
          <img alt="" :src="item.materialList[0].materialUrl" />
        </a>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
/**
 * @author tangdaibing
 * @description 服务商品详情页页面中部广告位
 */
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import adJumpHandle from '~/mixins/adJumpHandle'
import { publicApi } from '@/api/index'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  mixins: [adJumpHandle],
  props: {
    adLocationCode: {
      type: String,
      default: 'ad10049', // 优惠券广告位
    },
  },
  data() {
    return {
      adList: [],
    }
  },
  mounted() {
    this.getAdlist(this.adLocationCode || 'ad100399')
  },
  methods: {
    getAdlist(transAdCode) {
      this.adList = []
      this.$axios
        .post(publicApi.findAdvertising, {
          locationCodeList: [transAdCode],
        })
        .then((res) => {
          if (res.data && JSON.stringify(res.data) !== '{}')
            this.adList = res.data[transAdCode].sortMaterialList
        })
    },
  },
}
</script>

<style lang="less">
.ad_area {
  background: white;
  margin-bottom: 20px;
  width: 100%;
  height: 132px;
  border-radius: 24px;
  overflow: hidden;
  .sp-swipe {
    width: 100%;
    height: 100%;
    .sp-swipe-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
