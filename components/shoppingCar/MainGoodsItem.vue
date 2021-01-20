<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 16:40:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 17:29:24
 * @Description: file content
 * @FilePath: /chips-wap/components/shoppingCar/MainGoodsItem.vue
-->
<template>
  <div class="main-goods-item">
    <div class="goods-lable-img" @click="handleGoDetail">
      <img alt="img" :src="mainData.img" />
    </div>
    <div class="goods-info">
      <strong class="goods-name" @click="handleGoDetail">
        {{ mainData.name }}</strong
      >
      <div class="goods-sku">
        <sp-tag
          color="#F8F8F8"
          text-color="#999999"
          size="large"
          @click="handleSkuOpen"
        >
          <span class="goods-sku__text"> {{ mainData.skuAttrName }}</span>

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
          integer
          step="1"
          button-size="0.40rem"
          input-width="0.80rem"
          min="1"
          class="goods-count-stepper"
          :value="goodsCount"
          :max="maxNum"
          :async-change="true"
          :disabled="
            mainData &&
            mainData.serviceResourceList &&
            mainData.serviceResourceList.length >= 1
          "
          @change="handleCountChange"
          @focus="handleCountFoucs"
          @blur="handleCountBlur"
          @overlimit="handleOverlimit"
        >
          <template #minus-icon="{ disabled }">
            <sp-icon
              class-prefix="spiconfont"
              name="shop_ic_reduce"
              size="0.28rem"
              :color="disabled ? '#cccccc' : '#1a1a1a'"
            />
          </template>
          <template #plus-icon="{ disabled }">
            <sp-icon
              class-prefix="spiconfont"
              name="shop_ic_add"
              size="0.28rem"
              :color="disabled ? '#cccccc' : '#1a1a1a'"
            />
          </template>
        </sp-stepper>
      </div>
      <div v-if="mainData.addServiceList.length" class="goods-service">
        <div class="goods-service__row-left">增值服务</div>
        <div class="goods-service__row-right">
          <div
            v-for="addService of mainData.addServiceList"
            :key="addService.serviceItemId"
            class="goods-service__item"
          >
            <span class="goods-service__title">{{
              addService.serviceItemName
            }}</span>
            <span class="goods-service__content"></span>
            <span class="goods-service__count">{{
              `${addService.price ? addService.price : '--'}元  x${
                addService.num
              }`
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  SwipeCell,
  Card,
  Button,
  Checkbox,
  Tag,
  Stepper,
  Icon,
} from '@chipspc/vant-dgg'

const SHOP_RESTRICTION = {
  unrestricted: 'PRO_SHOP_RESTRICTION_ALL', // 无限制
  restrictedNumber: 'PRO_SHOP_RESTRICTION_NUMBER', // 限制数量
  forbid: 'PRO_SHOP_RESTRICTION_NO', // 禁止购买
}

export default {
  name: 'MainGoodsItem',
  components: {
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Tag.name]: Tag,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
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
      countStatus: 'blur', // foucs
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),

    maxNum() {
      const { numFlag, maxNum } = this.mainData || {}
      let max =
        numFlag === SHOP_RESTRICTION.restrictedNumber && maxNum ? maxNum : 99
      max = Number(max)
      if (isNaN(max)) max = 1
      return max
    },
  },
  watch: {
    // 'mainData.goodsNumber': {
    //   handler(newVal, oldVal) {
    //     console.log('goodsNumber newVal:', newVal)
    //     if (newVal === oldVal) return
    //     this.goodsCount = newVal || 0
    //   },
    //   immediate: true,
    // },
    mainData: {
      handler(newVal, oldVal) {
        console.log('mainData newVal:', newVal)
        const { goodsNumber } = newVal || {}
        if (goodsNumber !== this.goodsCount) {
          this.goodsCount = goodsNumber || 0
        }
      },
      immediate: true,
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
      console.log('handleCountChange value:', value)
      if (this.goodsCount === value) return

      // 聚焦不校验，在失去焦点才校验
      if (this.countStatus === 'foucs') {
        this.goodsCount = value
        return
      }
      // 异步校验
      console.log('handleCountChange value:', value)

      // 人为修改,通知父组件
      this.$emit('operation', {
        type: 'count',
        data: { value },
      })
    },
    // 输入框获取焦点
    handleCountFoucs() {
      console.log('handleCountFoucs')
      this.countStatus = 'foucs'
    },

    // 输入框失去焦点
    handleCountBlur() {
      console.log('handleCountBlur')
      const value = this.goodsCount
      if (value !== this.mainData.goodsNumber) {
        this.$emit('operation', {
          type: 'count',
          data: { value },
        })
      }
      this.countStatus = 'blur'
    },

    // 超过购买限制后的触发
    handleOverlimit(action) {
      const { serviceResourceList = [] } = this.mainData || {}
      let message = ''
      switch (action) {
        case 'minus':
          message = '已经是最小购买数了'
          break
        case 'plus':
          message = '已经是最大购买数了'
          break
      }
      if (
        Array.isArray(serviceResourceList) &&
        serviceResourceList.length >= 1
      ) {
        message = '选择资源服务后，商品数量不能修改'
      }
      this.$xToast.show({
        message,
        duration: 1000,
        icon: 'toast_ic_remind',
        forbidClick: true,
      })
    },

    // 跳转到详情页面
    handleGoDetail() {
      this.uPGoDetail()
    },

    // 统一跳转详情app详情路由
    uPGoDetail() {
      const { productId } = this.mainData || {}
      if (!productId) {
        this.$xToast({
          message: '缺少productId',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }

      if (this.isInApp) {
        const iOSRouter = {
          path:
            'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId },
          },
        }
        const androidRouter = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/goods/details/service',
            parameter: { productId },
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast({
                message: '跳转失败',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          }
        )
      }
      // 暂不需要在浏览器中
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
      &__text {
        .textOverflow(1);
        font-size: 22px;
      }
      .ic__sku-open {
        margin-left: 8px;
      }

      /deep/.sp-tag--large {
        height: 40px;
        padding: 0 16px;
        display: flex;
        align-items: center;
      }
    }
    .goods-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26px;
      line-height: 36px;
      overflow: hidden;
      .sales-price {
        flex: 1;
        width: 0; // 保证元素宽度平分父元素宽度,不会超出, 在safari无效，只能用max-width
        max-width: 250px;
        overflow: hidden;
        display: flex;
        align-items: baseline;
        .big-value {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
        &__input:disabled {
          color: #1a1a1a;
        }
      }
    }
    .goods-service {
      display: flex;
      margin-top: 34px;
      &__row-left {
        font-size: 22px;
        font-weight: bold;
        color: #222222;
        line-height: 26px;
        flex: 88px 0 1;
        white-space: nowrap;
      }
      &__row-right {
        margin-left: 15px;
        flex: 1;
      }
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }
      &__title {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 26px;
        .textOverflow(1);
      }
      &__content {
      }
      &__count {
        margin-left: 30px;
        font-size: 22px;
        font-weight: bold;
        color: #222222;
        line-height: 26px;
        white-space: nowrap;
      }
    }
  }
}
</style>
