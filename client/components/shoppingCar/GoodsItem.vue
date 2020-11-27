<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 14:45:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 15:06:46
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/GoodsItem.vue
-->
<template>
  <div class="goods-item">
    <sp-swipe-cell
      :disabled="status === 'offShelf'"
      :class="{ 'goods-item--disable': status === 'offShelf' }"
    >
      <div class="goods-item__content">
        <div class="goods-item__content-line-bottom sp-hairline--bottom">
          <div class="goods-item__main">
            <sp-checkbox
              v-model="checked"
              icon-size="0.32rem"
              class="goods-item__check"
              @change="handleChange"
            ></sp-checkbox>
            <MainGoodsItem />
          </div>

          <div v-for="i in 2" :key="i" class="goods-item__vice">
            <div class="goods-item__vice-line--top sp-hairline--top">
              <ViceGoodsItem />
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <sp-button square text="删除" type="danger" class="delete-button" />
      </template>
    </sp-swipe-cell>
  </div>
</template>

<script>
import { SwipeCell, Card, Button, Checkbox } from '@chipspc/vant-dgg'

import MainGoodsItem from './MainGoodsItem'
import ViceGoodsItem from './ViceGoodsItem'

export default {
  name: 'GoodsItem',
  components: {
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    MainGoodsItem,
    ViceGoodsItem,
  },
  props: {
    status: {
      type: String,
      default: 'sale', // offShelf：下架
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
    },
  },
}
</script>

<style lang="less" scoped>
.goods-item--disable {
  filter: grayscale(100%);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
  }
}

.goods-item {
  &__content {
    padding: 0 40px 0 32px;
    &-line-bottom {
      margin-left: 64px;
    }
  }
  &__main {
    font-size: 24px;
    width: 100%;
    padding: 32px 0 32px 0;
    position: relative;
    display: flex;
    align-items: flex-start;
    .goods-item__check {
      position: absolute;
      top: 96px;
      left: -64px;
    }
  }
  &__vice {
    width: 100%;
    padding-left: 0;
    &-line--top {
      padding: 32px 0;
    }
  }
  /deep/.sp-hairline--top {
    &::after {
      border-top-style: dashed !important;
    }
  }
}
</style>
