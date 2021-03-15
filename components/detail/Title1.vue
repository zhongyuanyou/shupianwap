<template>
  <div class="title">
    <p class="title_btitle">{{ proDetail.name }}</p>
    <div class="title_tags">
      <span
        v-for="(item, index) in [
          '千万补贴',
          '1对1服务',
          '视频看房',
          '视频看房1',
        ]"
        :key="index"
        class="title_tags_item"
        :class="{ title_tags_main: index == 0 }"
        >{{ item }}</span
      >
    </div>
    <div class="title_desc">
      公司注册是开始创业的第一步，
      根据《中华人民共和国公司法》规定，注册公司时需要依法向注册公司时需要...
    </div>
    <div class="title_bottom">
      <span class="title_bottom_money">{{ proDetail.platformPrice }}元</span>
      <span class="title_bottom_num">销量 5678</span>
    </div>
    <PriceReduction ref="priceR"></PriceReduction>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import PriceReduction from '~/components/detail/PriceReduction'
export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    PriceReduction,
  },
  data() {
    return {}
  },
  computed: {
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
  },
  methods: {
    handleShowPriceRed() {
      this.$refs.priceR.show = true
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  padding: 60px 40px 45px 40px;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  &_btitle {
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 52px;
    word-break: break-all;
  }
  &_tags {
    margin-top: 15px;
    display: flex;
    &_item {
      height: 32px;
      background-color: #f0f2f5;
      color: #5c7499;
      font-size: 22px;
      font-family: PingFang SC;
      padding: 0 7px;
      line-height: 32px;
      border-radius: 4px;
      font-weight: 400;
      margin-right: 12px;
    }
    &_main {
      background-color: #fc4e41;
      color: #ffffff;
      font-weight: bold;
    }
  }
  &_desc {
    margin-top: 26px;
    color: #999999;
    font-size: 26px;
    line-height: 38px;
    font-family: PingFang SC;
  }
  &_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFang SC;
    margin-top: 50px;
    &_money {
      font-weight: bold;
      color: #ec5330;
      font-size: 44px;
      line-height: 52px;
    }
    &_num {
      color: #999999;
      font-size: 24px;
      font-weight: 400;
    }
  }
}
</style>
