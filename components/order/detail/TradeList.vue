<template>
  <section>
    <div ref="content" class="serve-list serve-list1">
      <div v-for="(item, index) in goodsList" :key="index" class="item">
        <TradeItem :item="item" />
      </div>
    </div>
    <div v-if="orderData.orderSkuList.length > 3" class="btn-p">
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
  </section>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import TradeItem from './TradeItem'
export default {
  components: {
    [Button.name]: Button,
    TradeItem,
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
    }
  },
  computed: {
    height() {
      return this.goodsList.length > 3 && this.hideMore ? '8.2rem' : 'auto'
    },
    goodsList() {
      return this.orderData.orderSkuList
    },
  },
  methods: {
    toNav() {},
    handleClickBtn() {
      this.hideMore = !this.hideMore
      if (this.hideMore) {
        this.$refs.content.style.height = '8.2rem'
        this.$refs.content.style.transition = 'all 2s'
        this.$refs.content.style.overflow = 'hidden'
      } else {
        this.$refs.content.style.height = 'auto'
        this.$refs.content.style.maxHeight = '1000rem'
        this.$refs.content.style.transition = 'all 2s'
      }
    },
  },
}
</script>
<style lang="less" scoped>
.serve-list {
  max-height: 8.2rem;
  overflow: hidden;
  transition: all 3s;
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
  .img {
    width: 130px;
    height: 130x;
  }
}
</style>
