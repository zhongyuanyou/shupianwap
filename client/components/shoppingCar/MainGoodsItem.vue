<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 16:40:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 15:44:38
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/MainGoodsItem.vue
-->
<template>
  <div class="main-goods-item">
    <div class="goods-lable-img">
      <span class="lable">急售</span>
      <img alt="img" :src="mainData.img" />
    </div>
    <div class="goods-info">
      <strong class="goods-name"> {{ mainData.name }}</strong>
      <div class="goods-sku">
        <sp-tag
          color="#F8F8F8"
          text-color="#999999"
          size="large"
          @click="handleSkuOpen"
        >
          {{ formatPropList }}
          <my-icon
            name="shop_ic_open"
            size="0.14rem"
            color="#999999"
            class="ic__sku-open"
          ></my-icon
        ></sp-tag>
      </div>
      <div class="goods-price">
        <span class="sales-price">
          <span class="big-value">{{ mainData.price }}</span>
          <span class="unit">元</span>
        </span>
        <sp-stepper
          v-model="goodsCount"
          integer
          step="1"
          button-size="0.40rem"
          input-width="0.80rem"
          min="1"
          :max="mainData.maxNum"
          :async-change="true"
          @change="handleCountChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  SwipeCell,
  Card,
  Button,
  Checkbox,
  Tag,
  Stepper,
} from '@chipspc/vant-dgg'

export default {
  name: 'MainGoodsItem',
  components: {
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Tag.name]: Tag,
    [Stepper.name]: Stepper,
  },
  props: {
    mainData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      checked: false,
      goodsCount: 1,
    }
  },
  computed: {
    formatPropList() {
      const propList = this.mainData.propList
      if (!Array.isArray(propList)) return ''
      return propList.reduce((accumulator, item) => {
        const { name } = item || {}
        if (name) accumulator += `;${name}`
        return accumulator
      }, '')
    },
  },
  watch: {
    'mainData.goodsNumber'(newVal, oldVal) {
      if (newVal === oldVal) return
      this.goodsCount = newVal || 0
    },
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
    },
    handleSkuOpen() {
      console.log('handleSkuOpen')
      this.$emit('operation', { type: 'openSku' })
    },
    handleCountChange(value) {
      if (this.goodsCount === value) return
      // TODO异步校验
      this.goodsCount = value
      console.log('handleCountChange value:', value)

      // 人为修改,通知父组件
      this.$emit('operation', { type: 'count', value: this.goodsCount })
    },
  },
}
</script>

<style lang="less" scoped>
.main-goods-item {
  font-size: 24px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  .goods-lable-img {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 32px;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.16);
    }
    > img {
      width: 100%;
      height: 100%;
    }
    > .lable {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      z-index: 2;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      height: 44px;
      padding: 0 12px;
      background: #ec5330;
      border-radius: 8px 0px 8px 0px;
    }
  }
  .goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .goods-name {
      display: flex;
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      margin-top: -4px;
      .textOverflow(2);
    }
    .goods-sku {
      margin-top: 22px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .ic__sku-open {
        margin-left: 8px;
      }
      /deep/.sp-tag--large {
        height: 40px;
      }
    }
    .goods-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26px;
      line-height: 36px;
      .sales-price {
        display: flex;
        align-items: baseline;
        .big-value {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        .unit {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
        }
      }
      /deep/.sp-stepper {
        color: #1a1a1a;
        font-size: 24px;
        font-weight: bold;
        button {
          background-color: transparent;
        }
        &__minus,
        &__plus {
          &::before,
          &::after {
            background-color: #1a1a1a;
          }
        }

        &__minus--disabled,
        &__plus--disabled {
          &::before,
          &::after {
            background-color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
