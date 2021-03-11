<template>
  <div class="page">
    <Header title="进行进度" @leftClickFuc="onClickLeft" />
    <div class="banner">
      <div class="left-img">
        <img
          src="https://sp-img-wlh.oss-cn-beijing.aliyuncs.com/crisps-product-center%3APRO_CLASS_TYPE_TRANSACTION%3A607997667594632518%3Aicon_1611797943000_%E5%85%AC%E5%8F%B8%E4%BA%A4%E6%98%93%E5%A4%B4%E5%9B%BE%E7%89%A9%E4%B8%9A%E5%9C%B0%E4%BA%A7%E7%B1%BB.png?x-oss-process=image/resize,m_fill,w_750,h_520,limit_0"
        />
      </div>
      <div class="right">
        <p class="goods-name">
          成都市有限公司注册注册服务成都市有限公司注册注册服务
        </p>
        <p class="price-area">
          <span class="goods-price">2020</span>
          <span class="text">元</span>
          <span class="goods-num">×1</span>
        </p>
      </div>
    </div>
    <ProcessList v-if="type === 1" />
    <div v-else class="batch-list" @click="toNav">
      <div class="title">办理进度</div>
      <div class="item no-border">
        <span>第一批次</span>
        <span>
          <my-icon
            class="back-icon"
            name="list_ic_next"
            size="0.24rem"
            color="rgba(204, 204, 204, 1)"
          ></my-icon>
        </span>
      </div>
      <div class="item">
        <span>第二批次</span>
        <span>
          <my-icon
            class="back-icon"
            name="list_ic_next"
            size="0.24rem"
            color="rgba(204, 204, 204, 1)"
          ></my-icon>
        </span>
      </div>
      <div class="item">
        <span>第三批次</span>
        <span>
          <my-icon
            class="back-icon"
            name="list_ic_next"
            size="0.24rem"
            color="rgba(204, 204, 204, 1)"
          ></my-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// 办理进度
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
  created() {
    this.type = Math.ceil(Math.random() * 2)
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    toNav() {
      this.$router.push('/order/processBatch')
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  background: #f4f4f4;
  min-height: 100vh;
  .banner {
    height: 218px;
    background: #ffffff;
    padding: 40px;
    display: flex;
    margin-bottom: 30px;
    .left-img {
      width: 130px;
      height: 130px;
      background: rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      overflow: hidden;
      img {
        width: auto;
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
  .batch-list {
    background: white;
    padding: 20px 40px;
    .title {
      font-size: 32px;
      color: #222;
      font-weight: bold;
    }
    .item {
      padding: 40px 0;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f4f4f4;
    }
    .no-border {
      border-top: none;
    }
  }
}
</style>
