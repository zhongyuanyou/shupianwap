<template>
  <div class="sku">
    <!-- 使用弹出框 -->
    <sp-popup
      v-model="visible"
      round
      position="bottom"
      class="sku-container"
      :safe-area-inset-bottom="true"
      v-on="$listeners"
    >
      <div class="sku-header sp-hairline--bottom">
        <sp-image
          fit="cover"
          class="sku-header__img-wrap"
          :src="goods.picture"
        />
        <div class="sku-header__goods-info">
          <div class="sku__goods-price">
            <span class="sku__price-num">{{ goods.price }}</span>
            <span class="sku__price-unit">元</span>
          </div>
          <div class="sku-header-item">
            <div class="sku__number">编号:{{ goods.goodsNo }}</div>
          </div>
        </div>
      </div>
      <div class="sku-body" :style="{ 'max-height': '400px' }">
        <!-- S 属性 -->
        <div class="sku-group">
          <!-- 因为 sku必须选择一个, 所以选择后不能取消 is-cancel="false" -->
          <SkuServiceRow
            v-for="treeItem of formatSkuTree"
            :key="treeItem.k_id"
            :sku-row="treeItem"
            :actived="formatSkuAttr"
            :is-cancel="false"
            :close-on-click-overlay="false"
            @selectChange="handleSelectChange"
          />
        </div>
        <!-- E 属性 -->
        <!-- S 数量 -->
        <div class="sku-stepper-wrap sp-hairline--bottom">
          <SkuServiceStepper
            :selected-num="goods.goodsNumber"
            :disable-stepper-input="false"
            :disabled="
              goods.serviceResourceList && goods.serviceResourceList.length >= 1
            "
            :max-num="skuData.maxNumber"
            @change="handleStepperChange"
            @overLimit="handleStepperLimit"
          />
        </div>
        <!-- E 数量 -->
        <div class="sku-group">
          <!-- S 服务资源 -->
          <SkuServiceRow
            v-if="formatSkuResourceService.length"
            :sku-row="{ k: '服务资源' }"
          >
            <div class="sku-resource">
              <sp-cell
                v-for="resourceService of formatSkuResourceService"
                :key="resourceService.classCode"
                class="sku-resource__item"
                is-link
                @click="handleResourceClick(resourceService)"
              >
                <template #title>
                  <span class="sku-resource__item-title"
                    >{{ resourceService.className }}：</span
                  >
                  <span class="sku-resource__item-content">{{
                    resourceService.serviceItemValName || ''
                  }}</span>
                </template>
                <template #default>
                  <span
                    class="sku-resource__item-operation"
                    :class="{
                      'sku-resource__item-operation--placehodler': !resourceService.serviceItemValId,
                    }"
                    >{{
                      resourceService.serviceItemValId
                        ? '￥' + resourceService.price
                        : '请选择'
                    }}</span
                  >
                </template>
              </sp-cell>
            </div>
          </SkuServiceRow>
          <!-- E 服务资源 -->
          <!-- S 增值服务 -->
          <div v-if="formatSkuAddService.length" class="sku-add">
            <div class="sku-add__title">增值服务</div>
            <div class="sku-add__item">
              <SkuServiceRow
                v-for="addService of formatSkuAddService"
                :key="addService.k_id"
                class="sku-add__sub-row"
                :sku-row="addService"
                :is-sub="true"
                :actived="addService.activedList"
                @selectChange="handleAddSelectChange"
              >
              </SkuServiceRow>
            </div>
          </div>
          <!-- E 增值服务 -->
        </div>
      </div>
      <div class="sku-actions sp-hairline--top">
        <!-- <sp-button
            class="sku-service-actions__car-btn"
            size="large"
            type="warning"
            @click="handleAddShoppingCar"
          >
            加入购物车
          </sp-button>
          <sp-button
            class="sku-service-actions__buy-btn"
            size="large"
            type="danger"
            @click="handleBuy"
          >
            立即购买
          </sp-button> -->
        <sp-button
          class="sku-actions__comfirm-btn"
          size="large"
          type="warning"
          @click="handleAddShoppingCar"
        >
          确定
        </sp-button>
      </div>

      <sp-icon
        class="sku-close"
        class-prefix="spiconfont"
        size="0.28rem"
        name="popup_ic_close"
        color="#1A1A1A"
        @click="handleClose"
      />
    </sp-popup>
  </div>
</template>

<script>
import { Popup, Image, Stepper, Cell, Button, Icon } from '@chipspc/vant-dgg'
import SkuServiceRow from './SkuServiceRow'
import SkuServiceStepper from './SkuServiceStepper'

import clone from '@/utils/clone'

export default {
  name: 'SkuService',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Image.name]: Image,
    [Stepper.name]: Stepper,
    [Cell.name]: Cell,
    SkuServiceRow,
    SkuServiceStepper,
  },
  model: {
    prop: 'show',
    event: 'update',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    skuData: {
      type: Object,
      default() {
        return {}
      },
    },
    goods: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      // sku: {
      //   tree: [
      //     {
      //       k: '区域',
      //       k_s: 's1',
      //       k_id: '1',
      //       v: [
      //         {
      //           id: '1',
      //           name: '锦江区',
      //         },
      //       ],
      //     },
      //   ],
      //   price: '3.00', // 默认价格（单位元）
      // },
    }
  },
  computed: {
    visible: {
      get() {
        return this.show
      },
      set(newVal) {
        this.$emit('update', newVal)
      },
    },
    formatSkuTree() {
      if (!Array.isArray(this.skuData.tree)) return []
      const selectedSkuAttrList = ('' + this.goods.skuAttrKey).split(',')
      return this.skuData.tree.map((item) => {
        const { v = [] } = item || {}
        if (!Array.isArray(v)) return { ...item }
        const mapAttrList = v.map((attrVal) => {
          const actived = selectedSkuAttrList.includes(attrVal.id)
          return { ...attrVal, actived }
        })
        return { ...item, v: mapAttrList }
      })
    },
    formatSkuAttr() {
      const { skuAttrKey } = this.goods
      return ('' + skuAttrKey).split(',')
    },
    formatSkuAddService() {
      if (!Array.isArray(this.skuData.addServiceList)) return []
      const selectedAddServiceList = this.goods.addServiceList
      return this.skuData.addServiceList.map((item) => {
        // eslint-disable-next-line
        const { k_id, v = [] } = item || {}
        if (!Array.isArray(v)) return { ...item }
        const activedList = []
        const activedServiceItem = selectedAddServiceList.find(
          // eslint-disable-next-line
          (service) => service.serviceItemId === k_id
        )
        if (activedServiceItem) {
          const matchedServiceVal = v.find(
            (val) => val.id === activedServiceItem.serviceItemValId
          )
          matchedServiceVal && activedList.push(matchedServiceVal.id)
        }

        return { ...item, activedList }
      })
    },
    formatSkuResourceService() {
      if (!Array.isArray(this.skuData.resourceServiceList)) return []
      return this.skuData.resourceServiceList.map((item) => {
        const { classCode, className, id, url } = item || {}
        const matched =
          this.goods.serviceResourceList.find((resource) => {
            const { serviceItemId } = resource || {}
            return serviceItemId === id
          }) || {}
        const { price, serviceItemValName, serviceItemValId } = matched
        return {
          id,
          classCode,
          className,
          price,
          serviceItemValName,
          serviceItemValId,
          url,
        }
      })
    },
  },
  methods: {
    onBuyClicked(value) {
      console.log('onBuyClicked:', value)
    },
    onAddCartClicked(value) {
      console.log('onAddCartClicked:', value)
    },
    // sku属性选择
    handleSelectChange(value) {
      console.log('handleSelectChange:', value)
      this.$emit('operation', {
        type: 'skuSelect',
        data: value,
      })
    },

    // 增值服务选择
    handleAddSelectChange(value) {
      console.log('handleAddSelectChange:', value)
      this.$emit('operation', {
        type: 'addServiceSelect',
        data: value,
      })
    },
    // 触发数量的选择
    handleStepperChange(value) {
      console.log('handleStepperChange:', value)
      this.$emit('operation', {
        type: 'skuCount',
        data: value,
      })
    },
    // 超过限制的数量后触发
    handleStepperLimit(data) {
      console.log('handleStepperLimit:', data)
      let message = ''
      const { type } = data || {}
      switch (type) {
        case 'minus':
          message = '已经是最小购买数了'
          break
        case 'plus':
          message = '已经是最大购买数了'
          break
      }
      const { serviceResourceList = [] } = this.goods || {}

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

    // 选择服务资源
    handleResourceClick(resource) {
      console.log('handleResourceClick resource:', resource)
      const { classCode, url } = resource || {}
      const type = '' // 没什么卵用

      this.$emit('operation', {
        type: 'resourceServiceSelect',
        data: { type, classCode, url },
      })
    },

    handleAddShoppingCar() {
      console.log('handleAddShoppingCar')
      this.$emit('operation', {
        type: 'addShoppingCar',
        data: clone(this.goods, true),
      })
    },
    handleClose() {
      this.visible = false
    },
    handleBuy() {},
  },
}
</script>

<style lang="less" scoped>
.sku {
  position: relative;
  display: flex;
  align-items: center;
  &-container {
    padding: 40px 40px 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 40%;
    max-height: 80%;
  }
  &-header {
    flex-shrink: 0;
    display: flex;
    padding-bottom: 40px;
    &__img-wrap {
      width: 180px;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
    }
    &__goods-info {
      margin-left: 24px;
    }
    &-item {
      font-size: 24px;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      margin-top: 18px;
    }
  }
  &__goods-price {
    color: #ec5330;
    display: flex;
    align-items: baseline;
  }
  &__price-num {
    font-size: 40px;
    font-weight: bold;
    color: #ec5330;
    line-height: 44px;
  }
  &__price-unit {
    font-size: 22px;
    font-weight: 400;
    color: #ec5330;
    line-height: 26px;
    margin-left: 12px;
  }
  &-body {
    flex: 1 1 auto;
    min-height: 44px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  &-stepper-wrap {
    padding: 32px 0;
  }

  &-resource {
    &__item {
      height: 72px;
      background: #f8f8f8;
      border-radius: 8px;
      font-size: 26px;
      font-weight: 500;
      line-height: 30px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      /deep/.sp-cell__title {
        display: inline-flex;
        align-items: center;
        flex: 50% 1 0;
      }
      &-title {
        color: #555555;
        white-space: nowrap;
      }
      &-content {
        color: #cccccc;
        .textOverflow(1);
      }
      &-operation {
        font-weight: 400;
        color: #222222;
        white-space: nowrap;
        .textOverflow(1);
      }
      &-operation--placehodler {
        color: #999999;
      }
    }
  }
  &-add {
    padding-top: 30px;
    &__title {
      font-size: 28px;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
    }
    &__item {
      padding: 30px 0 10px;
    }
    &__sub-row {
      padding: 0 0 14px 0;
    }
  }
  &-actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    line-height: 36px;
    padding: 24px 0;
    &__car-btn {
      width: 327px;
      height: 100px;
      background-color: #fe8c29;
      border-radius: 8px;
    }
    &__buy-btn {
      width: 327px;
      height: 100px;
      background: #ec5330;
      border-radius: 8px;
    }
    &__comfirm-btn {
      // width: 327px;
      flex: 1;
      height: 100px;
      background: #ec5330;
      border: none;
      border-radius: 8px;
    }
  }
  &-close {
    position: absolute;
    top: 46px;
    right: 46px;
    z-index: 1;
    color: #c8c9cc;
    font-size: 22px;
    cursor: pointer;
  }
}
</style>
