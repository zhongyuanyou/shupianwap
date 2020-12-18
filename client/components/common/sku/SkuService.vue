<template>
  <div class="sku-service">
    <sp-sku
      v-model="visible"
      class="sku-service-container"
      :sku="skuData"
      :goods="goods"
      :quota="quota"
      :quota-used="quotaUsed"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <template #sku-header>
        <div class="sku-service-header sp-hairline--bottom">
          <sp-image
            fit="cover"
            class="sku-service-header__img-wrap"
            :src="goods.picture"
          />
          <div class="sku-service-header__goods-info">
            <div class="sku-service__goods-price">
              <span class="sku-service__price-num">{{ goods.price }}</span>
              <span class="sku-service__price-unit">元</span>
            </div>
            <div class="sku-service-header-item">
              <div class="sku-service__number">编号:{{ goods.goodsNo }}</div>
            </div>
          </div>
        </div>
      </template>
      <template #sku-group="{ selectedNum, skuEventBus, selectedSkuComb }">
        <div class="sku-service-group">
          <SkuServiceRow
            v-for="treeItem of formatSkuTree"
            :key="treeItem.k_id"
            :sku-row="treeItem"
            :actived="formatSkuAttr"
            @selectChange="handleSelectChange"
          />
        </div>
        <div class="sku-service-stepper-wrap sp-hairline--bottom">
          <SkuServiceStepper
            :quota="quota"
            :quota-used="quotaUsed"
            :start-sale-num="startSaleNum"
            :sku="sku"
            :sku-event-bus="skuEventBus"
            :selected-sku-comb="selectedSkuComb"
            :selected-num="selectedNum"
            :disable-stepper-input="false"
            @change="handleStepperChange"
          />
        </div>
        <div class="sku-service-group">
          <SkuServiceRow :sku-row="{ k: '服务资源' }">
            <div class="sku-service-resource">
              <sp-cell
                v-for="resourceService of skuData.resourceServiceList"
                :key="resourceService.classCode"
                class="sku-service-resource__item"
                is-link
                @click="handleResourceClick('address')"
              >
                <template #title>
                  <span class="sku-service-resource__item-title"
                    >{{ resourceService.className }}：</span
                  >
                  <span class="sku-service-resource__item-content"
                    >成都师花样正金融服务中心一楼三单元</span
                  >
                </template>
                <template #default>
                  <span
                    class="sku-service-resource__item-operation sku-service-resource__item-operation--placehodler"
                    >请选择</span
                  >
                </template>
              </sp-cell>
              <!-- <sp-cell class="sku-service-resource__item" is-link>
                <template #title>
                  <span class="sku-service-resource__item-title"
                    >400电话：</span
                  >
                  <span class="sku-service-resource__item-content"
                    >4008-6962-540</span
                  >
                </template>
                <template #default>
                  <span class="sku-service-resource__item-operation"
                    >￥5.00</span
                  >
                </template>
              </sp-cell> -->
            </div>
          </SkuServiceRow>
          <div class="sku-service-add">
            <div class="sku-service-add__title">增值服务</div>
            <div class="sku-service-add__item">
              <SkuServiceRow
                v-for="addService of formatSkuAddService"
                :key="addService.k_id"
                class="sku-service-add__sub-row"
                :sku-row="addService"
                :is-sub="true"
                :actived="addService.activedList"
                @selectChange="handleAddSelectChange"
              >
              </SkuServiceRow>
              <!-- <SkuServiceRow
                class="sku-service-add__sub-row"
                :sku-row="sku.tree[2]"
                :is-sub="true"
              > 
              </SkuServiceRow> -->
            </div>
          </div>
        </div>
      </template>

      <template #sku-stepper="{}">
        <div></div>
      </template>
      <template #sku-actions="{ skuEventBus }">
        <div class="sku-service-actions sp-hairline--top">
          <sp-button
            class="sku-service-actions__car-btn"
            size="large"
            type="warning"
          >
            加入购物车
          </sp-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <sp-button
            class="sku-service-actions__buy-btn"
            size="large"
            type="danger"
            @click="skuEventBus.$emit('sku:buy')"
          >
            立即购买
          </sp-button>
        </div>
      </template>
    </sp-sku>
  </div>
</template>

<script>
import { Image, Sku, Stepper, Cell, Button } from '@chipspc/vant-dgg'
import SkuServiceRow from './SkuServiceRow'
import SkuServiceStepper from './SkuServiceStepper'

export default {
  name: 'SkuService',
  components: {
    [Sku.name]: Sku,
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
    quota: {
      type: Number,
      default: 0,
    },
    quotaUsed: {
      type: Number,
      default: 0,
    },
    startSaleNum: {
      type: Number,
      default: 1,
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
      sku: {
        tree: [
          {
            k: '区域',
            k_s: 's1',
            k_id: '1',
            v: [
              {
                id: '1',
                name: '锦江区',
              },
              {
                id: '2',
                name: '青羊区',
              },
              {
                id: '3',
                name: '双流区',
              },
              {
                id: '4',
                name: '成渝立交',
              },
              {
                id: '5',
                name: '新都区',
              },
              {
                id: '6',
                name: '成华区',
              },
              {
                id: '7',
                name: '成都高新区',
              },
            ],
            largeImageMode: true,
          },
          {
            k: '地址情况',
            k_s: 's2',
            k_id: '2',
            v: [
              {
                id: '1',
                name: '有注册地址',
              },
              {
                id: '2',
                name: '无注册地址',
              },
            ],
          },
          {
            k: '极速办理',
            k_s: 's3',
            k_id: '3',
            v: [
              {
                id: '1',
                name: '3天以内完成￥100.00',
              },
              {
                id: '2',
                name: '5天以内完成￥80.00',
              },
              {
                id: '3',
                name: '7天以内完成￥60.00',
              },
              {
                id: '4',
                name: '10天以内完成￥50.00',
              },
            ],
          },
        ],
        price: '3.00', // 默认价格（单位元）
      },
      // goods: {
      //   price: 2,
      //   title: '测试商品',
      //   picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
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
  },
  methods: {
    onBuyClicked(value) {
      console.log('onBuyClicked:', value)
    },
    onAddCartClicked(value) {
      console.log('onAddCartClicked:', value)
    },
    // sku属性选择
    handleSelectChange(value, value2) {
      console.log('handleSelectChange:', value, value2)
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
    handleStepperChange(event) {
      this.$emit('stepper-change', event)
    },
    handleResourceClick(type) {
      console.log('handleResourceClick type:', type)
    },
  },
}
</script>

<style lang="less" scoped>
.sku-service {
  display: flex;
  align-items: center;
  &-container {
    padding: 40px 40px 0;
  }
  &-header {
    display: flex;
    padding-bottom: 40px;
    &__img-wrap {
      width: 180px;
      height: 180px;
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
        flex: 60% 1 0;
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
  }
}
</style>
