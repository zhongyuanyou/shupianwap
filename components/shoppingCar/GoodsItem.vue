<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 14:45:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 20:10:49
 * @Description: file content
 * @FilePath: /chips-wap/components/shoppingCar/GoodsItem.vue
-->
<template>
  <div
    class="goods-item"
    :class="{
      'goods-item--disable': commodityData.status === 'GOODS_STATUS_OFF_SHELF',
    }"
  >
    <SkuService
      v-model="show"
      :sku-data="formateSkuData"
      :goods="tempGoods"
      @operation="handleOperation"
      @open="handleOpenSku"
      @closed="handleClosedSku"
    />
    <sp-swipe-cell
      ref="swipeCell"
      :disabled="commodityData.status === 'GOODS_STATUS_OFF_SHELF'"
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
              :main-data="commodityData"
              @operation="handleOperation"
            />
          </div>
          <div
            v-for="serviceResource of commodityData.serviceResourceList"
            :key="serviceResource.serviceItemId"
            class="goods-item__vice"
          >
            <div class="goods-item__vice-line--top sp-hairline--top">
              <ViceGoodsItem :vice-data="serviceResource" />
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="goods-item__operation">
          <!-- 一期没有 -->
          <!-- <sp-button
            square
            type="primary"
            text="移入关注"
            class="goods-item__operation-attention"
            @click="handleAttention"
          /> -->
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
      v-if="commodityData.status === 'GOODS_STATUS_OFF_SHELF'"
      class="goods-item--disable-tip flex-c-c flex-c-a-c"
    >
      <span class="goods-item--disable-tip__zh">已下架</span>
      <span class="division-line">·</span>
      <span class="goods-item--disable-tip__en">off shelf</span>
    </div>
    <!--S loding-->
    <LoadingCenter v-show="loading" />
    <!--E loding-->
    <!--S 中间轻提示-->
    <SpToast ref="spToast" />
    <!--E 中间轻提示-->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import { SwipeCell, Card, Button } from '@chipspc/vant-dgg'

import MainGoodsItem from './MainGoodsItem'
import ViceGoodsItem from './ViceGoodsItem'
import SkuService from '@/components/common/sku/SkuService'
import AsyncCheckbox from '@/components/common/checkbox/AsyncCheckbox'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import SpToast from '@/components/common/spToast/SpToast'

import clone from '@/utils/clone'
import fingerprint from '@/utils/fingerprint'

import { shoppingCar } from '@/api'

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
    LoadingCenter,
    SpToast,
  },
  props: {
    commodityData: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      skuData: {
        productId: '',
        name: '',
        productNo: '',
        referencePrice: '', // 参考价格
        shopRestrictionNumber: '', // 购买数量限制
        shopRestriction: '', // 限制购买
        skuAttrList: [], // 属性列表
        serviceGoodsClassList: [], // 服务资源列表
        goodsId: '',
        goodsNo: '',
        specialItemList: [], // 增值服务项
      },
      tempGoods: {
        goodsId: '',
        goodsNo: '',
        name: '',
        skuAttrKey: '', // 选中sku列表逗号隔开
        goodsNumber: 0,
        serviceResourceList: [], // 服务资源
        price: '',
        productId: '',
        addServiceList: [], // 增值服务
      },
      config: { userId: '', deviceCode: '', reqArea: '', terminalCode: '' }, // 不同平台的配置
    }
  },
  computed: {
    ...mapState({
      cityCode: (state) => state.city.currentCity.code,
      userInfo: (state) => state.user.userInfo,
      isInApp: (state) => state.app.isInApp,
    }),
    checked() {
      return !!this.commodityData.shopIsSelected
    },
    formateSkuData() {
      if (!this.skuData) return { tree: [] }
      const {
        productId,
        name,
        productNo,
        referencePrice,
        skuAttrList,
        serviceGoodsClassList,
        specialItemList,
      } = this.skuData
      if (!Array.isArray(skuAttrList)) return { tree: [] }
      const tree = skuAttrList.map((item) => {
        const { id, code, name, attrValList = [] } = item
        return {
          k: name,
          k_s: 'sp' + code, // 自定义的前缀
          k_id: id,
          v: Array.isArray(attrValList)
            ? attrValList.map((item) => {
                const { id, code, name } = item || {}
                return {
                  id: code, // 因使用的是code 获取商品属性
                  originId: id,
                  code,
                  name,
                }
              })
            : [],
        }
      })

      // 服务资源列表
      const resourceServiceList = Array.isArray(serviceGoodsClassList)
        ? serviceGoodsClassList
        : []

      // 增值服务
      const addServiceList = Array.isArray(specialItemList)
        ? specialItemList.map((item) => {
            const { serviceItemId, code, name, serviceItemValList = [] } = item
            const formatServiceItemValList = Array.isArray(serviceItemValList)
              ? serviceItemValList.map((val) => {
                  const {
                    id,
                    name,
                    originalPrice,
                    salesPrice,
                    settlementPrice,
                  } = val || {}
                  return {
                    id,
                    name: `${name}  ￥${originalPrice}`,
                  }
                })
              : []

            return {
              k: name,
              k_s: 'sp' + code, // 自定义的前缀
              k_id: serviceItemId,
              v: formatServiceItemValList,
            }
          })
        : []

      return {
        tree,
        resourceServiceList,
        addServiceList,
        productId,
        name,
        productNo,
        referencePrice,
      }
    },
  },

  methods: {
    handleAsyncCheckboxChange(value) {
      console.log('handleAsyncCheckboxChange:', value)
      this.handleOperation({ type: 'select', data: { value } })
      // TODO 异步处理
      // this.checked = value
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
      this.handleOperation({ type: 'detele', data: {} })
    },
    handleAttention() {
      console.log('handleAttention')
      // this.$refs.swipeCell.close()
      this.handleOperation({ type: 'attention', data: {} })
    },
    handleOperation(value = {}) {
      const { type, data } = value
      const { cartId } = this.commodityData
      switch (type) {
        case 'openSku':
          this.openSku()
          break
        case 'count':
        case 'select':
        case 'detele':
        case 'attention':
          this.$emit('operation', { data, type, cartId })
          break
        case 'skuSelect':
          this.selecteSku(data)
          break
        case 'addServiceSelect':
          this.selecteAddService(data)
          break
        case 'addShoppingCar':
          this.addShoppingCar(data)
          break
        case 'skuCount': // sku弹出框里数量改变
          this.changeSkuCount(data)
          break
        case 'resourceServiceSelect': // sku弹出框里资源服务
          this.$emit('operation', {
            data,
            type,
            cartId,
            index: this.index,
          })
          break
      }
    },
    handleOpenSku() {
      const { cartId } = this.commodityData
      this.$emit('operation', {
        type: 'skuOpen',
        cartId,
        index: this.index,
      })
    },
    handleClosedSku() {
      const { cartId } = this.commodityData
      this.$emit('operation', {
        type: 'skuClosed',
        cartId,
        index: this.index,
      })
    },
    async openSku() {
      if (!this.skuData.skuAttrList || !this.skuData.skuAttrList.length) {
        await this.getSkuData()
      }
      const {
        skuId,
        skuAttrKey,
        goodsNo,
        goodsNumber,
        serviceResourceList,
        price,
        productId,
        addServiceList,
      } = this.commodityData

      this.tempGoods = {
        goodsId: skuId,
        skuAttrKey,
        goodsNo,
        goodsNumber,
        price,
        productId,
        serviceResourceList: clone(serviceResourceList, true),
        addServiceList: clone(addServiceList, true),
      }

      this.show = true
    },
    // 商品sku属性的选择
    selecteSku(data = {}) {
      const { activedList = [], inactivedList = [], id } = data
      let skuAttrList = this.tempGoods.skuAttrKey.split(',')
      activedList.forEach((item) => {
        !skuAttrList.includes(item) && skuAttrList.push(item)
      })
      skuAttrList = skuAttrList.filter((item) => !inactivedList.includes(item))
      //
      const currentSkuAttr = skuAttrList.join(',')
      this.loading = true
      this.getGoodsDetail(currentSkuAttr)
        .then((data) => {
          this.tempGoods.skuAttrKey = currentSkuAttr
          // 每次请求sku 增值服务需要清空
          this.tempGoods.addServiceList = []
          this.loading = false
        })
        .catch(() => {
          this.$xToast.show({
            message: '选择失败',
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
          this.loading = false
        })
    },

    // 增值服务的选择
    selecteAddService(data = {}) {
      console.log('结果')
      const { activedList = [], id } = data

      const originData = this.skuData.specialItemList
      const activedItem = originData.find((item) => item.serviceItemId === id)
      if (!activedItem) return
      // 因为目前只能单选，取activedList[0]就行
      const activedVal =
        activedItem.serviceItemValList.find(
          (item) => item.id === activedList[0]
        ) || {}
      const { name, originalPrice, salesPrice, settlementPrice } = activedVal

      const matchedAddService = this.tempGoods.addServiceList.find(
        (item) => item.serviceItemId === id
      )

      if (matchedAddService) {
        // 对tempGoods中的数据，选中就修改, 没有选中则移除
        const resultGoods = activedList.length
          ? this.tempGoods.addServiceList.map((item) => {
              if (item.serviceItemId === id) {
                return {
                  ...item,
                  serviceItemValId: activedVal.id,
                  serviceItemValName: name,
                  price: originalPrice,
                }
              }
              return { ...item }
            })
          : this.tempGoods.addServiceList.filter((item) => {
              return item.serviceItemId !== id
            })
        this.tempGoods.addServiceList = resultGoods
        return
      }
      this.tempGoods.addServiceList = this.tempGoods.addServiceList.concat({
        serviceItemId: id,
        serviceItemName: activedItem.name,
        serviceItemValId: activedVal.id,
        serviceItemValName: name,
        price: originalPrice,
      })
    },

    // 加入购物车
    addShoppingCar(data = {}) {
      console.log(data)
      const {
        goodsId,
        skuAttrKey,
        goodsNumber,
        serviceResourceList = [],
        addServiceList = [],
      } = data

      const serviceList = []
      serviceResourceList.forEach((item) => {
        serviceList.push({
          ...item,
          type: 3,
        })
      })
      addServiceList.forEach((item) => {
        serviceList.push({
          ...item,
          type: 2,
        })
      })
      this.loading = true
      this.postUpdate({
        value: goodsNumber,
        cartId: this.commodityData.cartId,
        serviceList,
        skuAttr: skuAttrKey,
        skuId: goodsId,
        type: 'updateSkuItem',
      })
        .then((data) => {
          this.loading = false
          this.show = false
          // 关闭动画有300ms，等动画关闭完，再刷新
          setTimeout(() => {
            this.$emit('operation', {
              type: 'refresh',
            })
          }, 250)
        })
        .catch(() => {
          this.loading = false
          this.$xToast.show({
            message: '加入购物车失败',
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
        })
    },

    // 修改sku弹出框 商品的数量
    changeSkuCount(value) {
      this.tempGoods.goodsNumber = value
    },

    // 资源服务的选择
    selecteResourceService(data = {}) {
      const { id, name, goodsPrice, classCode } = data

      if (!classCode) return
      const { serviceResourceList = [] } = this.tempGoods
      const matchedItem = this.skuData.serviceGoodsClassList.find(
        (item) => item.classCode === classCode
      )
      const className = matchedItem ? matchedItem.className : ''
      const filteredList = serviceResourceList.filter(
        (item) => item.serviceItemId !== matchedItem.id
      )
      filteredList.push({
        price: goodsPrice,
        num: 1,
        serviceItemId: matchedItem.id,
        serviceItemName: className,
        serviceItemValId: id,
        serviceItemValName: name,
      })
      this.tempGoods.serviceResourceList = filteredList
    },

    // 根据不同的平台差异，获取不同的参数
    async uPGetConfig() {
      if (this.config.deviceCode) return { ...this.config }

      let userId = ''
      let deviceCode = ''
      let reqArea = ''
      let terminalCode = ''

      // 在app运行环境
      if (this.isInApp) {
        terminalCode = 'COMDIC_TERMINAL_APP'
        const devicePromise = this.getAppDeviceInfo()
        const regionPromise = this.getAppRegion()
        ;[deviceCode, reqArea] = await Promise.all([
          devicePromise,
          regionPromise,
        ])
      } else {
        terminalCode = 'COMDIC_TERMINAL_WAP'
        reqArea = this.cityCode
        deviceCode = await fingerprint()
      }
      userId = this.userInfo.userId
      const config = { userId, deviceCode, reqArea, terminalCode }
      this.config = config
      return config
    },

    // 在app中获取Code
    getAppDeviceInfo() {
      return new Promise((resolve, reject) => {
        this.$appFn.dggDeviceInfo((res) => {
          console.log('dggDeviceInfo res:', res)
          const { code, data = {} } = res
          if (code === 200) {
            resolve(data['X-Device-Code'])
            return
          }
          reject(res)
        })
      })
    },

    // 获取app当前的站点
    getAppRegion() {
      return new Promise((resolve, reject) => {
        this.$appFn.dggCityCode((res) => {
          console.log('dggCityCode:', res)
          const { code, data } = res || {}
          if (code === 200) {
            const { adCode } = data
            resolve(adCode)
            return
          }
          reject(res)
        })
      })
    },

    // 第一次获取sku属性
    async getSkuData() {
      try {
        this.loading = true
        const config = await this.uPGetConfig()
        const productId = this.commodityData.productId // '607991345402771561'
        const attrValKey = this.commodityData.skuAttrKey // SXZ20201211050014
        const productPromise = shoppingCar.productDetail({ productId }, config)
        const skuPromise = this.getGoodsDetail(attrValKey)
        const [productDetail = {}, skuDetail = {}] = await Promise.all([
          productPromise,
          skuPromise,
        ])

        const {
          skuAttrList, // 属性列表
          serviceGoodsClassList, // 服务资源列表
          name,
          referencePrice, // 参考价格
          productNo,
          operating = {},
        } = productDetail

        const { shopRestrictionNumber, shopRestriction } = operating

        const data = {
          name,
          productNo,
          referencePrice,
          shopRestrictionNumber,
          shopRestriction,
          skuAttrList,
          serviceGoodsClassList,
          ...skuDetail,
        }
        this.skuData = data
        this.loading = false
        console.log(data)
        return data
      } catch (error) {
        console.error('getList:', error)
        this.loading = false
        this.$refs.spToast.show({
          message: '获取sku失败',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_remind',
        })
        return Promise.reject(error)
      }
    },

    // 获取商品服务详情
    async getGoodsDetail(attrValKey) {
      try {
        const productId = this.commodityData.productId || '607991345402771561' // '607991345402771561'
        const goodsDetail = await shoppingCar.skuDetail({
          productId,
          attrValKey,
        })
        const {
          id,
          specialItemList, // 增值服务项
          goodsNo,
          priceResult = {},
        } = goodsDetail

        const {
          salesPriceSum, // 销售价格
        } = priceResult

        const data = {
          goodsId: id,
          goodsNo,
          productId,
          specialItemList,
        }
        this.tempGoods = { ...this.tempGoods, ...data, price: salesPriceSum }
        console.log(data)
        return data
      } catch (error) {
        console.error('getGoodsDetail:', error)
        return Promise.reject(error)
      }
    },

    // 更新购物车数据
    async postUpdate(data = {}) {
      const { type, cartId, value, serviceList, skuAttr, skuId } = data
      let params = {}
      switch (type) {
        case 'updateSkuItem':
          // 修改sku,默认选中
          params = {
            serviceList,
            skuAttr,
            skuId,
            goodsNumber: value,
            selectFlag: 1,
          }
          break
      }
      try {
        const userId = this.userInfo.userId
        const defalutParams = {
          id: cartId,
          createrId: userId,
          type,
        }
        let data = await shoppingCar.update({ ...defalutParams, ...params })
        console.log(data)
        data = data || {}
        return data
      } catch (error) {
        console.error('postUpdate:', error)
        return Promise.reject(error)
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
    /deep/&-line--top.sp-hairline--top {
      &::after {
        border-top-style: dashed !important;
      }
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
}
</style>
