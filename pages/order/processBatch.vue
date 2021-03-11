<template>
  <div class="page">
    <Header title="第一批次" @leftClickFuc="onClickLeft" />
    <ProcessList />
  </div>
</template>

<script>
// 办理进度批次信息
import { mapMutations, mapState } from 'vuex'
import { Button, RadioGroup, Radio, Cell } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import ProcessList from '@/components/order/process/ProcessList'
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    Header,
    ProcessList,
  },
  data() {
    return {
      orderData: {},
      time: {}, // 倒计时
      diff: 0, // 时间差 s
      typeList: [
        {
          code: 'CRISPS_C_ZFFS_ALI',
          name: '支付宝支付',
          icon: 'pay_ic_alipay',
          color: 'rgba(23, 151, 236, 1)',
        },
        {
          code: 'CRISPS_C_ZFFS_WECHAT',
          name: '微信支付',
          icon: 'pay_ic_wechat',
          color: 'rgba(41, 175, 18, 1)',
        },
        {
          code: 'CRISPS_C_ZFFS_CARD',
          name: '银行卡支付',
          icon: 'pay_ic_bank',
          color: 'rgba(255, 133, 60, 1)',
        },
      ],
      payPlatform: 'CRISPS_C_ZFFS_ALI',
      payName: '支付宝支付',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    navTop() {
      return 44
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  background: #f4f4f4;
  min-height: 100vh;
  .banner {
    height: 194px;
    background: #ffffff;
    padding: 20px 40px;
    display: flex;
    .left-img {
      width: 130px;
      height: 130px;
      background: rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      padding-left: 20px;
      flex: 1;
      .goods-name {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36px;
        margin-bottom: 10px;
      }
      .price-area {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 36px;
        span {
          display: block;
          float: left;
        }
        .goods-price {
          font-size: 28px;
        }
        .text {
          font-size: 24px;
        }
        .goods-num {
          float: right;
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
}
</style>
