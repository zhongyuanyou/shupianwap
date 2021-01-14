<template>
  <div class="title">
    <div class="title_tags">
      <div class="title_tags_con">
        <!--        <div-->
        <!--          v-for="(item, index) in info.tags"-->
        <!--          :key="index"-->
        <!--          class="title_tags_con_item"-->
        <!--        >-->
        <!--          {{ item }}-->
        <!--        </div>-->
      </div>
      <div class="title_tags_remind" @click="handleShowPriceRed">
        <my-icon
          name="notify_ic_clock1"
          color="#4974f5"
          size="0.32rem"
          class="icon"
        />降价提醒
      </div>
    </div>
    <p class="title_btitle">{{ tcProductDetailData.name }}</p>
    <div class="imp_remind">
      <nuxt-link to="/spread/riskTips">
        <sp-image
          src="https://cdn.shupian.cn/sp-pt/wap/images/4eevblk9nmy0000.png?x-oss-process=image/resize,m_fill,w_40,h_30,limit_0"
          fit="cover"
        />
        <span>重要提醒</span>
      </nuxt-link>
    </div>
    <p class="money">{{ tcProductDetailData.platformPrice }}元</p>
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
  props: {
    tcProductDetailData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
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
  padding: 36px 40px 39px 40px;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .certificates_icon {
    width: 40px;
    height: 28px;
    background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/3llegqu9ofs0000.png);
  }
  &_tags {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: row;
    &_remind {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 36px;
      display: flex;
      .icon {
        margin-right: 12px;
      }
    }
    &_con {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      flex-direction: row;
      &_item {
        height: 32px;
        padding: 0 6px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        line-height: 32px;
        margin-right: 12px;
      }
    }
  }
  &_btitle {
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 56px;
    margin-top: 19px;
  }
  .imp_remind {
    margin-top: 30px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    a {
      display: flex;
      color: #222222;
      /deep/img {
        width: 40px;
        height: 30px;
      }
    }
    span {
      margin-left: 9px;
      color: #222222;
    }
  }
  .money {
    font-size: 52px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ec5330;
    line-height: 52px;
    margin-top: 50px;
  }
}
</style>
