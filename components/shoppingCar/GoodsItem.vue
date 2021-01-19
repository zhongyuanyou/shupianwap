<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 14:45:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-18 14:16:13
 * @Description: file content
 * @FilePath: /chips-wap/components/shoppingCar/GoodsItem.vue
-->
<template>
  <div
    class="goods-item"
    :class="{
      'goods-item--disable':
        formatGoodsStatusData.status !== 'GOODS_STATUS_ON_SHELF',
    }"
  >
    <SkuService
      v-model="show"
      :sku-data="formatSkuData"
      :goods="tempGoods"
      @operation="handleOperation"
      @open="handleOpenSku"
      @closed="handleClosedSku"
    />
    <sp-swipe-cell ref="swipeCell" :before-close="beforeClose">
      <div class="goods-item__content">
        <div class="goods-item__main">
          <!-- 购物车在完成下，不是上架产品都不能选择  -->
          <AsyncCheckbox
            v-model="checked"
            icon-size="0.32rem"
            class="goods-item__check"
            :disabled="
              formatGoodsStatusData.status !== 'GOODS_STATUS_ON_SHELF' &&
              shoppingCarStatus === 'completed'
            "
            @change="handleAsyncCheckboxChange"
          >
          </AsyncCheckbox>
          <MainGoodsItem
            class="goods-item__main-item"
            :main-data="commodityData"
            @operation="handleOperation"
          />
        </div>
        <!-- S 状态提示 -->
        <div
          v-if="formatGoodsStatusData.status !== 'GOODS_STATUS_ON_SHELF'"
          class="goods-item--disable-tip flex-c-c flex-c-a-c"
        >
          <span class="goods-item--disable-tip__zh">{{
            formatGoodsStatusData.statusTextZh
          }}</span>
          <span class="division-line">·</span>
          <span class="goods-item--disable-tip__en">{{
            formatGoodsStatusData.statusTextEn
          }}</span>
        </div>
        <!-- E 状态提示 -->
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
    <div class="goods-item__extra sp-hairline--bottom">
      <!-- S 资源服务 -->
      <div
        v-for="serviceResource of commodityData.serviceResourceList"
        :key="serviceResource.serviceItemId"
        class="goods-item__vice"
      >
        <div class="goods-item__vice-line--top sp-hairline--top">
          <ViceGoodsItem
            class="goods-item__vice-item"
            :vice-data="serviceResource"
          />
        </div>
      </div>
      <!-- E 资源服务 -->
    </div>
    <!--S loding-->
    <LoadingCenter v-show="loading" />
    <!--E loding-->
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

import clone from '@/utils/clone'
import fingerprint from '@/utils/fingerprint'

import { shoppingCar } from '@/api'

const SHOP_RESTRICTION = {
  unrestricted: 'PRO_SHOP_RESTRICTION_ALL', // 无限制
  restrictedNumber: 'PRO_SHOP_RESTRICTION_NUMBER', // 限制数量
  forbid: 'PRO_SHOP_RESTRICTION_NO', // 禁止购买
}

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
    // 购物车当前状态
    shoppingCarStatus: {
      type: String,
      default: 'completed', // edit 与 completed
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      skuData: {
        productId: '',
        picture: '',
        name: '',
        productNo: '',
        referencePrice: '', // 参考价格
        shopRestrictionNumber: '', // 购买数量限制
        shopRestriction: '', // 限制购买
        skuAttrList: [], // 属性列表
        serviceGoodsClassList: [], // 服务资源列表
        specialItemList: [], // 增值服务项
      },
      tempGoods: {
        picture: '',
        goodsId: '',
        goodsNo: '',
        skuAttrKey: '', // 选中sku列表逗号隔开
        goodsNumber: 0,
        price: '',
        productId: '',
        serviceResourceList: [], // 服务资源
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
      // 在购物车是完成状态，只能是上架的商品才能被选中，
      // 因为 shopIsSelected 为后台维护的选中的状态，在计算选中的数量与金额是排除了下架与删除的商品
      // 所以 在前端只是通过ui控制在购物车完成状态的 商品选中效果被禁用
      if (this.shoppingCarStatus === 'completed') {
        return (
          this.formatGoodsStatusData.status === 'GOODS_STATUS_ON_SHELF' &&
          !!this.commodityData.shopIsSelected
        )
      }
      return !!this.commodityData.shopIsSelected
    },
    formatSkuData() {
      if (!this.skuData) return { tree: [] }
      const {
        productId,
        name,
        productNo,
        shopRestrictionNumber,
        shopRestriction,
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
                    name: `${name}  ￥${salesPrice}`,
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

      // 获取购买的最大数量
      let maxNumber =
        shopRestriction === SHOP_RESTRICTION.restrictedNumber &&
        shopRestrictionNumber
          ? shopRestrictionNumber
          : 99
      maxNumber = Number(maxNumber)
      if (isNaN(maxNumber)) maxNumber = 1

      return {
        tree,
        resourceServiceList,
        addServiceList,
        productId,
        name,
        productNo,
        referencePrice,
        maxNumber,
      }
    },
    formatGoodsStatusData() {
      const { status } = this.commodityData || {}
      let stautsData = {
        status,
        statusTextZh: '--',
        statusTextEn: '--',
      }
      switch (status) {
        case 'GOODS_STATUS_ON_SHELF':
          stautsData = {
            status,
            statusTextZh: '上架',
            statusTextEn: 'on shelf',
          }
          break
        case 'GOODS_STATUS_OFF_SHELF':
          stautsData = {
            status,
            statusTextZh: '已下架',
            statusTextEn: 'off shelf',
          }
          break
        case 'GOODS_STATUS_DEL':
          stautsData = {
            status,
            statusTextZh: '已删除',
            statusTextEn: 'deleted',
          }
          break
      }
      return stautsData
    },
  },

  methods: {
    handleAsyncCheckboxChange(value) {
      console.log('handleAsyncCheckboxChange:', value)
      this.handleOperation({ type: 'select', data: { value } })
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
          this.openResourceService({
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

      const { picture } = this.skuData

      this.tempGoods = {
        picture,
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
          // 每次请求sku 增值服务, 资源服务需要清空
          this.tempGoods.addServiceList = []
          this.tempGoods.serviceResourceList = []
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.$xToast.show({
            message: '选择失败',
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
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
                  price: salesPrice,
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
        price: salesPrice,
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
              data,
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

    // 打开资源服务选择页面
    openResourceService(value) {
      if (this.tempGoods.goodsNumber > 1) {
        this.$xToast.show({
          message: '服务资源不支持单次多个购买，请先将购买数设置为1',
          duration: 1500,
          forbidClick: false,
          icon: 'toast_ic_remind',
        })
        return
      }

      // 获取当前选择的区域code
      const { skuAttrList = [] } = this.skuData || {}
      let areaCode = ''

      const matchedSkuAttr =
        Array.isArray(skuAttrList) &&
        skuAttrList.find((item) => item.code === 'PRO_ATTR_DATA_TYPE_AREA') //    PRO_ATTR_DATA_TYPE_AREA  510100
      if (matchedSkuAttr) {
        const { attrValList = [] } = matchedSkuAttr

        const { skuAttrKey } = this.tempGoods
        const skuAttrKeyArray = skuAttrKey.split(',')

        let matchedRegionSkuAttr = null
        if (Array.isArray(attrValList) && Array.isArray(skuAttrKeyArray)) {
          matchedRegionSkuAttr = attrValList.filter((item) => {
            const { code } = item || {}
            return skuAttrKeyArray.includes(code)
          })
        }
        if (Array.isArray(matchedRegionSkuAttr)) {
          areaCode = matchedRegionSkuAttr[0] && matchedRegionSkuAttr[0].code // 正常有一个数据 取第一个就行了
        }

        if (!areaCode) {
          this.$xToast.show({
            message: '未找到对应的区域code',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_remind',
          })
          return
        }
      }

      let { data = {} } = value || {}
      data = { ...data, areaCode }
      this.$emit('operation', { ...value, data })
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
        const productId = this.commodityData.productId
        const attrValKey = this.commodityData.skuAttrKey
        const productPromise = shoppingCar.productDetail({ productId }, config)
        const skuPromise = this.getGoodsDetail(attrValKey)
        const [productDetail = {}, skuDetail = {}] = await Promise.all([
          productPromise,
          skuPromise,
        ])

        const {
          name,
          referencePrice, // 参考价格
          productNo,
          id,
          skuAttrList, // 属性列表
          serviceGoodsClassList, // 服务资源列表
          operating = {},
          clientDetails = [], // 图片地址列表
        } = productDetail

        let picture = ''
        // 后端过来的数据嵌套太他妈深了，为了获取一张图片，一堆判断
        if (
          Array.isArray(clientDetails) &&
          clientDetails[0] &&
          Array.isArray(clientDetails[0].imgUrlList) &&
          clientDetails[0].imgUrlList[0]
        ) {
          picture = clientDetails[0].imgUrlList[0]
        }

        const { shopRestrictionNumber, shopRestriction } = operating
        const { specialItemList } = skuDetail || {}
        const data = {
          productId: id,
          picture,
          name,
          productNo,
          referencePrice,
          shopRestrictionNumber,
          shopRestriction,
          skuAttrList,
          serviceGoodsClassList,
          specialItemList,
        }
        this.skuData = data
        this.loading = false
        console.log(data)
        return data
      } catch (error) {
        console.error('getList:', error)
        this.loading = false
        this.$xToast.show({
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
  .goods-item__main-item,
  .goods-item__vice-item {
    filter: grayscale(100%);
    position: relative;
  }
  .goods-item__main-item::after,
  .goods-item__vice-item::after {
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
      font-size: 24px;
    }
    &__en {
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
    padding: 0 40px 0 96px;
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
  &__extra {
    margin: 0 40px 0 96px;
  }
  &__vice {
    width: 100%;
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
