<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 14:45:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 17:33:29
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/GoodsItem.vue
-->
<template>
  <div
    class="goods-item"
    :class="{ 'goods-item--disable': status === 'offShelf' }"
  >
    <SkuService v-model="show" />
    <sp-swipe-cell
      ref="swipeCell"
      :disabled="status === 'offShelf'"
      :before-close="beforeClose"
    >
      <div class="goods-item__content">
        <div class="goods-item__content-line-bottom sp-hairline--bottom">
          <div class="goods-item__main">
            <AsyncCheckbox
              v-model="checked"
              icon-size="0.32rem"
              class="goods-item__check"
              @change="handleAsyncCheckboxChange"
            >
            </AsyncCheckbox>
            <MainGoodsItem
              :main-data="commodityData.productVo"
              @operation="handleOperation"
            />
          </div>
          <div
            v-for="serviceVo of commodityData.serviceVoList"
            :key="serviceVo.id"
            class="goods-item__vice"
          >
            <div class="goods-item__vice-line--top sp-hairline--top">
              <ViceGoodsItem :vice-data="serviceVo" />
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="goods-item__operation">
          <sp-button
            square
            type="primary"
            text="移入关注"
            class="goods-item__operation-attention"
            @click="handleAttention"
          />
          <sp-button
            square
            type="danger"
            text="删除"
            class="goods-item__operation-delete"
            @click="handleDetele"
          />
        </div>
      </template>
    </sp-swipe-cell>
    <div
      v-if="status === 'offShelf'"
      class="goods-item--disable-tip flex-c-c flex-c-a-c"
    >
      <span class="goods-item--disable-tip__zh">已下架</span>
      <span class="division-line">·</span>
      <span class="goods-item--disable-tip__en">off shelf</span>
    </div>
  </div>
</template>

<script>
import { SwipeCell, Card, Button } from '@chipspc/vant-dgg'

import MainGoodsItem from './MainGoodsItem'
import ViceGoodsItem from './ViceGoodsItem'
import SkuService from '@/components/common/sku/SkuService'
import AsyncCheckbox from '@/components/common/checkbox/AsyncCheckbox'

export default {
  name: 'GoodsItem',
  components: {
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [Button.name]: Button,
    MainGoodsItem,
    ViceGoodsItem,
    SkuService,
    AsyncCheckbox,
  },
  props: {
    status: {
      type: String,
      default: 'sale', // offShelf：下架
    },
    commodityData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      checked: false,
      show: false,
    }
  },
  computed() {},
  methods: {
    handleAsyncCheckboxChange(value) {
      console.log('handleAsyncCheckboxChange:', value)
      // TODO 异步处理
      this.checked = value
    },
    beforeClose({ position, instance }) {
      console.log('position:', position)
      switch (position) {
        case 'left':
        case 'cell':
          instance.close()
          break
        case 'outside':
        case 'right':
          break
      }
    },
    handleDetele() {
      console.log('handleDetele')
      this.$emit('operation', { type: 'detele', item: {} })
    },
    handleAttention() {
      console.log('handleAttention')
      // this.$refs.swipeCell.close()
      this.$emit('operation', { type: 'attention', item: {} })
    },
    handleOperation(data = {}) {
      const { type, value } = data
      switch (type) {
        case 'openSku':
          this.show = true
          break
        case 'count':
          this.$emit('operation', { type: 'count', value })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.flex-c-c {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex-c-a-c {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
    z-index: 10;
  }
  &-tip {
    position: absolute;
    left: 116px;
    top: 52px;
    width: 120px;
    height: 120px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    font-weight: 400;
    color: #ffffff;
    z-index: 11;
    &__zh {
      content: '已下架';
      font-size: 24px;
    }
    &__en {
      content: 'off shelf';
      font-size: 18px;
    }
  }
  .division-line {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 12px;
    &::before,
    &::after {
      content: '';
      .horizontal-line(@width:30px; @bgColor:#ffffff;);
      margin: 0 4px;
    }
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
  &__operation {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: 400;
    color: #ffffff;
    height: 100%;
    &-attention,
    &-delete {
      width: 120px;
      height: 100%;
    }
  }
  /deep/.sp-hairline--top {
    &::after {
      border-top-style: dashed !important;
    }
  }
}
</style>
