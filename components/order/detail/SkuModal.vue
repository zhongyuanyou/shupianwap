<template>
  <sp-popup v-model="showModal" position="bottom">
    <div class="sku-modal">
      <div class="btn-close" @click="showPayModal = false">
        <my-icon name="nav_ic_close" size="0.28rem" color="#222222"> </my-icon>
      </div>
      <p class="title">产品属性</p>
      <p
        v-for="(skuObj, index) in product.fieldList"
        :key="index"
        class="sku-item"
      >
        <span>
          {{ skuObj.name || '公司名称' }}
        </span>
        <span class="sku-value">
          {{ skuObj.fieldValue || '公司名称' }}
        </span>
      </p>
    </div>
  </sp-popup>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
}
</script>

<style lang="less" scoped>
.sp-popup--bottom {
  border-radius: 24px 24px 0px 0px !important;
}
.sku-modal {
  max-height: 800px;
  min-height: 500px;
  height: auto;
  font-size: 28px;
  padding: 40px;
  position: relative;
  background: #ffffff;
  .btn-close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 40px;
    top: 60px;
    font-weight: 600;
    text-align: center;
    line-height: 0;
  }
  .title {
    text-align: center;
    font-size: 40px;
    margin-bottom: 40px;
    color: #1a1a1a;
    font-weight: 600;
  }
  .sku-item {
    padding: 20px 0;
    color: #999;
    border-bottom: 1px solid #f4f4f4;
    overflow: hidden;
    span {
      display: block;
      height: 36px;
      float: left;
      color: #555555;
    }
    .sku-value {
      float: right;
      max-width: 70%;
      overflow: hidden;
      white-space: nowrap;
      height: 36px;
      color: #1a1a1a;
    }
  }
}
</style>
