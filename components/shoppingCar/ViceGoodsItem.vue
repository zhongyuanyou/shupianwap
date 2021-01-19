<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 16:40:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-31 15:47:07
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/ViceGoodsItem.vue
-->
<template>
  <div class="vice-goods-item">
    <div class="vice-goods-item__left">
      <img class="vice-goods-item__img" alt="" :src="viceData.img" />
    </div>
    <div class="vice-goods-item__right">
      <div class="vice-goods-item__name-price">
        <strong class="vice-goods-item__name"
          >{{ viceData.serviceItemName }}
        </strong>
        <span class="vice-goods-item__unit-price">{{
          viceData.price != null ? `${viceData.price}元` : '--'
        }}</span>
      </div>
      <div class="vice-goods-item__descript">
        <span>{{
          viceData.serviceItemValName != null
            ? `${viceData.serviceItemValName}`
            : '--'
        }}</span>
      </div>
      <div class="vice-goods-item__total-price">
        <span class="vice-goods-item__price">
          <span class="vice-goods-item__price-value">{{
            viceData.price != null ? `${viceData.price}` : '--'
          }}</span>
          <span class="vice-goods-item__price-unit">元</span>
        </span>
        <span class="vice-goods-item__count">{{
          viceData.num != null ? `x${viceData.num}` : '--'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'

export default {
  name: 'ViceGoodsItem',
  components: {
    [Button.name]: Button,
  },
  props: {
    viceData: {
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
  methods: {},
}
</script>

<style lang="less" scoped>
.vice-goods-item {
  font-size: 24px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  color: #222222;
  &__left {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 8px;
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
  }
  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__img {
    width: 100%;
    height: 100%;
  }

  &__name-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
  &__name {
    font-size: 32px;
    line-height: 42px;
    margin-top: -4px;
    .textOverflow(2);
  }
  &__unit-price {
    font-size: 22px;
  }
  &__descript {
    font-size: 22px;
    font-weight: 400;
    color: #222222;
    line-height: 26px;
    margin-top: 10px;
  }

  &__total-price {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 26px;
    line-height: 36px;
  }
  &__price {
    display: flex;
    align-items: baseline;
    &-value {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ec5330;
    }
    &-unit {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ec5330;
    }
  }
  &__count {
    font-size: 22px;
    font-weight: bold;
    color: #222222;
    line-height: 26px;
  }
}
</style>
