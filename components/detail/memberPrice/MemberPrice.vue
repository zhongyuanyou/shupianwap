<template>
  <div class="member_price flex">
    <div class="flex_1">
      <div>
        <div class="price">
          <span class="price_int">45</span>
          <span class="price_decimal">.00</span>
        </div>
        <div>图片</div>
      </div>
      <div class="origin_price">80.555元</div>
    </div>
    <div class="right">
      <span>图片</span><span>会员中心</span
      ><my-icon
        name="order_ic_listnext"
        size="0.24rem"
        color="#ffffff"
        class="myIcon"
      />
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
  },
  props: {
    comment: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.flex_1 {
  flex: 1;
}
.member_price {
  background-color: #ccc;
  font-size: 0;
  padding: 27px 40px 23px;

  .price {
    font-family: PingFangSC-Medium;
    font-weight: bold;

    color: #ffffff;
    letter-spacing: 0;
    // line-height: 50px;
    .price_int {
      font-size: 48px;
    }
    .price_decimal {
      font-size: 20px;
    }
  }

  .origin_price {
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 0;
    line-height: 24px;
  }

  .right {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #ffe7d2;
    letter-spacing: 0;
    text-align: justify;
    line-height: 32px;
    // padding-top: 20px;
    display: flex;
    align-items: center;
  }
}
</style>
