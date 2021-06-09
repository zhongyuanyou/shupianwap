<template>
  <div class="service-goods-component">
    <div class="service-goods-component-item" @click="linkDetail(info)">
      <sp-image class="img" fit="cover" :src="info.indexImg || ''" />
      <div class="desc">
        <div class="desc-name">{{ info.orderName || '111' }}</div>
        <div class="desc-label">
          <span>千万补贴</span>
          <span>免手续费</span>
          <span>免手续费</span>
          <span>免手续费</span>
        </div>
        <div class="desc-text">锦江区 | 餐饮服务类 | 有注册经营地址</div>
        <div><span>669</span> <span>699</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'

export default {
  name: 'EvaluateList',
  components: {
    [Image.name]: Image,
  },
  props: {
    info: {
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
    linkWrite(info) {
      this.$router.push({
        path: '/my/evaluate/write',
        query: {
          indexImg: info.indexImg,
          orderName: info.orderName,
          infoId: info.evaluateCenterId,
          orderDesc: info.orderDesc,
        },
      })
    },
    linkDetail(info) {
      this.$router.push({
        path: '/my/evaluate/detail',
        query: {
          indexImg: info.indexImg,
          orderName: info.orderName,
          orderDesc: info.orderDesc,
          infoId: info.evaluateCenterId,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.service-goods-component {
  @item-padding: 32px 40px;
  @item-img-size: 130px;

  .service-goods-component-item {
    background: #fff;
    // padding: @item-padding;
    font-family: @fontf-pfsc-med;
    // padding: 28px 40px;

    display: flex;

    .img {
      width: 220px;
      height: 220px;
    }
    .desc {
      flex: 1;
      padding-left: 32px;
      font-size: 0;
      .desc-name {
        font-family: @fontf-pfsc-med;
        font-size: 32px;
        color: #222222;
        letter-spacing: 0;
        line-height: 42px;
      }
      .desc-label {
        margin-top: 7px;
        margin-right: -8px;
        span {
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          line-height: 20px;
          color: #5c7499;
          letter-spacing: 0;

          margin-right: 8px;
          margin-bottom: 4px;
          padding: 4px 6px;
          background: #f0f2f5;
          border-radius: 4px;
        }
      }
      .desc-text {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #222222;
        letter-spacing: 0;
        line-height: 22px;
        padding: 20px 0;
      }
    }
  }
}
</style>
