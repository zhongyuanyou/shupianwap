<template>
  <div class="basic">
    <p class="basic_title">基本信息</p>
    <slot name="basic"></slot>
    <div class="basic_offer">
      <div class="user">
        <my-icon
          name="trading_ic_price"
          color="#4974F5"
          size="0.38rem"
          class="icon"
        />
        <!--        <sp-image-->
        <!--          fit="cover"-->
        <!--          width="0.38rem"-->
        <!--          height="0.38rem"-->
        <!--          src="https://img.yzcdn.cn/vant/cat.jpeg"-->
        <!--        />-->
        <span>186***2232 等10人已出价</span>
      </div>
      <sp-button plain type="primary" size="small" @click="handleShowBarg"
        >去出价</sp-button
      >
    </div>
    <div class="open_app">
      <Open />
    </div>
    <Bargaining ref="barg" />
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import Open from '~/components/common/openApp/Open'
import Bargaining from '~/components/detail/Bargaining'
export default {
  name: 'Basic',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    Open,
    Bargaining,
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
    return {
      priceRedIsBarg: false,
    }
  },
  methods: {
    handleShowBarg() {
      this.$refs.barg.show = true
    },
  },
}
</script>

<style lang="less" scoped>
.basic {
  padding: 47px 40px 40px 40px;
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_offer {
    height: 86px;
    background-color: rgba(235, 243, 255, 0.5);
    border-radius: 4px;
    margin-top: 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 16px;
    .user {
      height: 86px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      span {
        margin-left: 19px;
      }
    }
  }
  .open_app {
    margin-top: 62px;
  }
}
</style>
