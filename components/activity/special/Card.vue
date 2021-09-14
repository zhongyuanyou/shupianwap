<template>
  <div class="goods" :class="{ last: last }">
    <div class="goods-image">
      <sp-image
        class="picture"
        fit="cover"
        :src="
          item.imageUrl
            ? $resizeImg(250, 250, item.imageUrl)
            : 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
        "
        alt="商品图片"
      />
    </div>
    <div class="goods-name multiRowOverflowDot">{{ item.skuName }}</div>

    <div class="price-conainer">
      <span v-if="parsePrice(item.specialPrice) !== '面议'">
        <span class="price-value">{{ parseFloat(item.specialPrice) }}</span
        ><span class="price-unit">元</span>
      </span>
      <span v-else class="price-unit">面议</span>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,

    // SpIcon: Icon,
  },
  props: {
    parsePrice: {
      type: Function,
      default() {},
    },
    item: {
      type: [Object],
      default: () => {
        return {}
      },
    },

    last: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {},
}
</script>
<style lang="less" scoped>
.multiRowOverflowDot {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.goods.last {
  margin-bottom: 0px;
}
.goods {
  font-size: 0;
  padding: 20px 20px 24px;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;

  .goods-image {
    border-radius: 12px;
    overflow: hidden;
  }
  .goods-name {
    // height: 88px;
    font-family: PingFangSC-Medium;
    font-size: bold;
    font-size: 32px;
    color: #222222;
    letter-spacing: 0;
    line-height: 44px;
    margin: 20px 0 12px;
  }
  .price-conainer {
    .price-value {
      font-family: PingFangSC-Medium;
      font-size: bold;
      font-size: 36px;
      color: #ec5330;
      letter-spacing: 0;
      line-height: 36px;
    }
    .price-unit {
      font-family: PingFangSC-Medium;
      font-size: bold;
      font-size: 22px;
      color: #ec5330;
      letter-spacing: 0;
      line-height: 22px;
    }
  }
}
</style>
