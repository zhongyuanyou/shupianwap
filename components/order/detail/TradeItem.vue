<template>
  <div class="item-inner">
    <div class="img">
      <img
        src="https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/lcci_bg.7bfafcf36.png"
        alt=""
        srcset=""
      />
    </div>
    <div class="right">
      <p class="goods-name">
        <span class="name"> {{ item.name }}</span>
        <span class="money1"> {{ item.price }}元 </span>
      </p>
      <div class="sku-info">
        <div class="goods-num">×{{ item.num || 1 }}</div>
        <p v-for="(item2, index2) in item.fieldList" :key="index2">
          {{ item2.fieldValue }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金胃口，按节点付费，完结付费有办理进度
import { Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Button.name]: Button,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    toNav() {},
  },
}
</script>

<style lang="less" scoped>
.item-inner {
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  .img {
    width: 130px;
    height: 130px;
    background: rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
  }
  .goods-name {
    display: flex;
    font-size: 28px;
    font-family: PingFang SC;
    line-height: 36px;
    color: #222222;
    margin-bottom: 20px;
    .name {
      font-weight: bold;
      flex: 1;
      .textOverflow(1);
      padding-right: 20px;
    }
    .money1 {
      font-weight: normal;
    }
  }
  .sku-info {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    height: auto;
    position: relative;
    .goods-num {
      position: absolute;
      right: 0;
      top: 0;
    }
    p {
      padding-right: 40px;
    }
  }
}
</style>
