<template>
  <section>
    <div
      ref="content"
      class="serve-list"
      :class="orderData.productVo.length > 3 ? 'serve-list1' : ''"
    >
      <div
        v-for="(item, index) in orderData.productVo"
        :key="index"
        class="item"
      >
        <ServeItem :item="item" @showSkuModal="showSkuModal" />
      </div>
    </div>
    <div v-if="orderData.productVo.length > 3" class="btn-p">
      <sp-button
        v-if="hideMore"
        icon="arrow-down"
        icon-position="right"
        @click="handleClickBtn"
        >展开</sp-button
      >
      <sp-button
        v-else
        icon="arrow-up"
        icon-position="right"
        @click="handleClickBtn"
        >收起</sp-button
      >
    </div>
    <SkuModal ref="skuModal" :product="selectProduct" />
  </section>
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金尾款，按节点付费，完结付费有办理进度
import { Button } from '@chipspc/vant-dgg'
import ServeItem from './ServeItem'
import SkuModal from './SkuModal' // 商品属性弹窗
export default {
  components: {
    [Button.name]: Button,
    ServeItem,
    SkuModal,
  },
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      hideMore: true,
      selectProduct: {}, // 选中的商品
    }
  },
  computed: {
    maxHeight() {
      return this.orderData.productVo.length * 275
    },
  },
  methods: {
    toNav() {},
    handleClickBtn() {
      this.hideMore = !this.hideMore
      if (this.hideMore) {
        this.$refs.content.style.height = '8.2rem'
      } else {
        this.$refs.content.style.height = this.maxHeight / 100 + 'rem'
      }
    },
    showSkuModal(obj) {
      this.$refs.skuModal.showModal = true
      this.selectProduct = obj
    },
  },
}
</script>
<style lang="less" scoped>
.serve-list {
  height: auto;
  overflow: hidden;
  transform-origin: 100% 100%;
  transform: none;
  transition: all 0.5s;
}
.serve-list1 {
  height: 820px;
}
.btn-p {
  text-align: center;
  line-height: 60px;
  .sp-button {
    width: 220px;
    height: 64px;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 32px;
    color: rgba(34, 34, 34, 1);
    font-size: 26px;
  }
  .sp-button:hover {
    background: none;
  }
  .sp-button::before {
    background: none;
  }
}
.height1 {
  height: 820px;
}
.auto {
  height: auto;
  transition: height 0.5s;
}
.item {
  padding: 20px 0;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  border-bottom: 1px solid #f4f4f4;
}
</style>
