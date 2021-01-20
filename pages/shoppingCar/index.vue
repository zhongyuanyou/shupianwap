<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 11:50:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 17:18:25
 * @Description: 购物车页面
 * @FilePath: /chips-wap/pages/shoppingCar/index.vue
-->

<template>
  <div class="shopping-car">
    <GoodsPopup ref="goodsPopup" />
    <div class="head">
      <Header title="购物车" class="head-nav">
        <template #left>
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="padding-left: 0.4rem"
            @click.native="onClickLeft"
          />
        </template>
        <template #right>
          <span
            v-show="list && list.length"
            class="head__operation"
            @click="onClickRight"
            >{{ shoppingCarStatus === 'edit' ? '完成' : '管理' }}</span
          >
        </template>
      </Header>
    </div>

    <div
      class="body"
      :class="{ 'shopping-car--disable': refreshing }"
      @click.capture="handleCaptureClick"
    >
      <!-- 在sku 等弹窗时候，锁住滚动 -->
      <div
        class="body-container"
        :class="{ 'sp-overflow-hidden': disableRefresh || refreshing }"
      >
        <sp-pull-refresh
          ref="pullRefresh"
          v-model="refreshing"
          class="shopping-car__refresh"
          :disabled="disableRefresh"
          @refresh="onRefresh"
        >
          <sp-list
            v-model="loading"
            class="shopping-car__goods"
            error-text="请求失败，点击重新加载"
            :error.sync="error"
            :finished="finished"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in list"
              :key="item.cartId"
              class="shopping-car__goods-item"
            >
              <GoodsItem
                ref="goodsItem"
                :commodity-data="item"
                :index="index"
                :shopping-car-status="shoppingCarStatus"
                @operation="handleItemOperation"
              />
            </div>
            <template #finished>
              <span v-if="list && list.length">没有更多了</span>
              <ShoppingCarNull v-else />
            </template>
            <!-- S 自定义加载控件 -->
            <template #loading>
              <div>
                <LoadingDown v-show="!refreshing && loading" :loading="true" />
              </div>
            </template>
            <!-- E 自定义加载控件 -->
          </sp-list>
        </sp-pull-refresh>
      </div>
    </div>
    <div
      v-if="list && list.length"
      class="footer sp-hairline--top"
      :class="{ 'shopping-car--disable': refreshing }"
    >
      <Bottombar
        :status="shoppingCarStatus"
        :bottom-data="bottomData"
        @operation="handleItemOperation"
      />
    </div>
    <LoadingCenter v-show="updateLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TopNavBar, Button, PullRefresh, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'

import GoodsItem from '@/components/shoppingCar/GoodsItem'
import Bottombar from '@/components/shoppingCar/Bottombar'
import GoodsPopup from '@/components/shoppingCar/GoodsPopup'
import ShoppingCarNull from '@/components/shoppingCar/ShoppingCarNull'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import LoadingDown from '@/components/common/loading/LoadingDown'

import { shoppingCar } from '@/api'

const shoppingCarStatusList = {
  completed: '完成',
  edit: '编辑',
}

export default {
  name: 'ShoppingCar',
  layout: 'keepAlive',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    Header,
    GoodsPopup,
    GoodsItem,
    Bottombar,
    ShoppingCarNull,
    LoadingCenter,
    LoadingDown,
  },
  data() {
    return {
      list: [],
      refreshing: false,
      loading: true,
      error: false,
      finished: false,
      shoppingCarStatus: 'completed', // edit: 编辑
      currentSelectedCartIds: [], // 选择的数据
      updateLoading: false,
      bottomData: {
        selectAll: false,
        totalAmount: '0.00',
        totalCount: 0,
        discountsAmount: '0.00',
      },
      skuOpenIndex: -1, // 记录当前打开的sku的序列号
      skuStatus: '',
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isInApp: (state) => state.app.isInApp,
    }),
    disableRefresh() {
      return this.skuStatus === 'open'
    },
  },
  watch: {
    currentSelectedCartIds: {
      handler(newVal, oldVal) {
        console.log('newVal:', newVal)
        if (newVal.length && newVal.length === this.list.length) {
          return (this.bottomData.selectAll = true)
        }
        return (this.bottomData.selectAll = false)
      },
      immediate: true,
    },
  },

  created() {
    if (process && process.client) {
      this.postUpdate({ type: 'init' })
      this.onLoad()
    }
  },
  mounted() {
    // 注册一个方法，app里面使用
    if (this.isInApp) {
      console.log('registHandler refresh start')
      this.$appFn.registHandler('refresh', (data) => {
        console.log('refresh:', data)
        this.onRefresh()
      })
    }
  },

  // 在keep-alive中起作用，刷新从400或者地址获取到数据后刷新状态
  activated() {
    console.log('activated:', this.$route.params)
    const { id, name, goodsPrice, classCode } = this.$route.params.data || {}
    const goodsItemInstance = this.$refs.goodsItem[this.skuOpenIndex]
    if (!goodsItemInstance) return
    goodsItemInstance.selecteResourceService({
      id,
      name,
      goodsPrice,
      classCode,
    })
  },

  // 离开时 路由拦截
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave:', to)
    // 从购物车到 400电话 或者 地址注册页 缓存
    if (['detail-selectPhone', 'detail-selectAddress'].includes(to.name)) {
      this.SET_KEEP_ALIVE({ type: 'add', name: 'ShoppingCar' })
    } else {
      this.SET_KEEP_ALIVE({ type: 'remove', name: 'ShoppingCar' })
    }
    next()
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),

    // notice: 在使用下拉刷新后，拉到最底部，马上使用手指点击，会导致pull-refresh组件中的touchend事件没触发，
    // 致使刷新没有执行，且refreshing也为false,这是若里面被点击，弹出poup,样式布局全部乱掉，
    // 目前想到的办法就是在：点击事件的捕获阶段，通过 .sp-pull-refresh__track 这个div的transform是否有值，来判断若是下拉状态，就阻止点击
    handleCaptureClick(event) {
      if (!this.$refs.pullRefresh) return
      const el = this.$refs.pullRefresh.$el
      const trackEl = el.querySelector('.sp-pull-refresh__track')
      if (!trackEl || !window) return
      const transformStyle = window
        .getComputedStyle(trackEl, null)
        .getPropertyValue('transform')

      if (transformStyle === 'none') return
      event.stopPropagation()
      event.preventDefault()
    },
    onClickLeft() {
      console.log('nav onClickLeft')
      if (this.isInApp) {
        this.$appFn.dggCloseWebView()
        return
      }
      this.$router.go(-1)
    },
    onClickRight() {
      console.log('nav onClickRight')
      this.shoppingCarStatus =
        this.shoppingCarStatus === 'completed' ? 'edit' : 'completed'
    },

    onLoad() {
      this.getList()
        .then((data) => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          // 只请求一次
          this.loading = false
          this.finished = true

          this.list = data
          // 接收选中的放入 currentSelectedCartIds 中
          this.currentSelectedCartIds = data.reduce((accumulator, item) => {
            if (item.shopIsSelected === 1) {
              accumulator.push(item.cartId)
            }
            return accumulator
          }, [])
        })
        .catch(() => {
          this.error = true
          this.loading = false
          this.refreshing = false
        })
    },
    onRefresh({ type } = {}) {
      this.finished = false
      this.loading = true
      if (type !== 'list') {
        this.postUpdate({ type: 'init' })
      }
      this.onLoad()
    },
    handleItemOperation(value = {}) {
      const { type, data, cartId, index } = value
      console.log('type:', type)
      switch (type) {
        case 'detele':
          this.deteleItem(cartId, data)
          break
        case 'deteleAll':
          this.deteleAllItem()
          break
        case 'attention':
          this.attentionItem(cartId, data)
          break
        case 'select':
          this.selectItem(cartId, data)
          break
        case 'count':
          this.countOperation(cartId, data)
          break
        case 'selectAll':
          this.selectAll(data)
          break
        case 'bill':
          this.uPBill(data)
          break
        case 'refresh':
          this.refreshing = true
          this.bottomData = {
            ...this.bottomData,
            totalAmount: data.total,
            totalCount: data.totalCount,
          }
          this.onRefresh({ type: 'list' })
          break
        case 'resourceServiceSelect': // sku弹出框里资源服务
          this.selecteResourceService(cartId, data, index)
          break
        case 'skuOpen':
          this.skuStatus = 'open'
          break
        case 'skuClosed':
          this.skuStatus = 'close'
          break
      }
    },

    // 删除列表
    deteleItem(cartId, data) {
      this.$refs.goodsPopup
        .open('detele')
        .then(() => {
          console.log('发起请求')
          console.log('deteleItem:', cartId, data)
          cartId = '' + cartId
          return this.postUpdate({ cartId, type: 'remove' })
        })
        .then(() => {
          const cartArray = cartId.split(',')
          cartArray.forEach((item) => {
            const index = this.currentSelectedCartIds.indexOf(item)
            console.log('index', index)
            index > -1 && this.currentSelectedCartIds.splice(index, 1)
          })

          this.list = this.list.filter((item) => {
            return !cartArray.includes(item.cartId)
          })
          this.$xToast.success('删除成功')
        })
    },

    // 全删除
    deteleAllItem() {
      if (this.currentSelectedCartIds.length === 0) {
        this.$xToast({
          message: '请选择需要删除的商品',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      const cartId = this.currentSelectedCartIds.join(',')
      this.deteleItem(cartId)
    },

    // 关注列表
    attentionItem(cartId, data) {},
    // 全选
    selectAll(data) {
      const cartIdArray = this.list.map((item) => item.cartId)
      const cartId = cartIdArray.join()
      this.selectItem(cartId, data).catch((error) => {
        this.$xToast.show({
          message: error.message || '选择失败',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
      })
    },

    // 统一的结算
    uPBill() {
      const billCarIds = this.list.reduce((accumulator, item) => {
        // 结算时候需要过滤掉非上架产品
        if (
          this.currentSelectedCartIds.includes(item.cartId) &&
          item.status === 'GOODS_STATUS_ON_SHELF'
        ) {
          accumulator.push(item.cartId)
        }
        return accumulator
      }, [])

      if (!billCarIds.length) {
        this.$xToast.show({
          message: '您还没有选择商品哦',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }

      const cartIdsStr = billCarIds.join(',') // 多个cartId 用逗号凭借为一个
      console.log(cartIdsStr)
      // 在app中
      if (this.isInApp) {
        const iOSRouter = {
          path:
            'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cps/place_order',
            parameter: { cartId: cartIdsStr, type: 1 },
          },
        }
        const androidRouter = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cps/place_order',
            parameter: { cartId: cartIdsStr, type: 1 },
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
              this.$xToast.show({
                message: '结算失败',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          }
        )
      }
    },

    // 资源服务的选择
    selecteResourceService(cartId, value, index) {
      const { type, classCode, url, areaCode } = value
      if (!url) {
        this.$xToast.show({
          message: '选择无效',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return
      }
      this.skuOpenIndex = index
      // 通过后台接口配置的跳转400或者注册地址查询页面
      const fullPath = areaCode
        ? `${url}&areaCode=${areaCode}&redirect=shoppingCar`
        : `${url}&redirect=shoppingCar`
      this.$router.replace(fullPath)
    },

    // 选择
    async selectItem(cartId, data = {}) {
      cartId = '' + cartId
      const { value } = data
      try {
        const data = await this.postUpdate({ cartId, type: 'select', value })
        const cartArray = cartId.split(',')
        if (value) {
          // 选中
          cartArray.forEach((item) => {
            !this.currentSelectedCartIds.includes(item) &&
              this.currentSelectedCartIds.push(item)
          })
        } else {
          cartArray.forEach((item) => {
            const index = this.currentSelectedCartIds.indexOf(item)
            console.log('index', index)
            index > -1 && this.currentSelectedCartIds.splice(index, 1)
          })
        }

        this.list = this.list.map((item) => {
          let shopIsSelected = item.shopIsSelected
          cartArray.includes(item.cartId) && (shopIsSelected = value)
          return { ...item, shopIsSelected }
        })
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 数量操作
    async countOperation(cartId, data) {
      console.log('countOperation:', cartId, data)
      cartId = '' + cartId
      const { value } = data
      try {
        const data = await this.postUpdate({ cartId, type: 'updateNum', value })
        const cartArray = cartId.split(',')
        cartArray.forEach((item) => {
          !this.currentSelectedCartIds.includes(item) &&
            this.currentSelectedCartIds.push(cartId)
        })

        this.list = this.list.map((item) => {
          let goodsNumber = item.goodsNumber
          // 增加数量， 减少数量， 默认选中,且增值服务的数量也随主产品数量一致
          let shopIsSelected = item.shopIsSelected
          let addServiceList = item.addServiceList || []
          if (cartArray.includes(item.cartId)) {
            goodsNumber = value
            shopIsSelected = true
            addServiceList = addServiceList.map((addItem = {}) => ({
              ...addItem,
              num: value,
            }))
          }
          return { ...item, goodsNumber, shopIsSelected, addServiceList }
        })
      } catch (error) {
        console.log('countOperation', error)
        // 为了通知MainGoodsItem 组件更新为原来的数量
        this.list = this.list.map((item) => {
          return { ...item }
        })
      }
    },

    // 请求购物车列表
    async getList() {
      try {
        const userId = this.userInfo.userId
        let data = await shoppingCar.list({ userId })
        console.log(data)
        if (!Array.isArray(data)) data = []
        return data
      } catch (error) {
        console.error('getList:', error)
        return Promise.reject(error)
      }
    },

    // 更新购物车数据
    async postUpdate(data = {}) {
      const { type, cartId, value, serviceList, skuAttr, skuId } = data
      this.updateLoading = true
      let params = {}
      switch (type) {
        case 'updateNum':
          // 增加数量， 减少数量， 默认选中
          params = { goodsNumber: value, selectFlag: 1 }
          break
        case 'remove':
          break
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
        case 'select':
          params = { selectFlag: +value } // 将boolean转换为数字（1：选中 ,0：取消选中）
          break
        case 'init':
          // 根据后台要求，id不能为空，虽然不用，所以随便传
          params = { id: '12233', createrId: this.userInfo.userId }
          this.updateLoading = false // 获取初始不用loading
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
        const { total, totalCount } = data
        this.bottomData = { ...this.bottomData, totalAmount: total, totalCount }
        this.updateLoading = false
        return data
      } catch (error) {
        console.error('postUpdate:', error)
        this.updateLoading = false
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.shopping-car {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  .head {
    &__operation {
      padding-right: 40px;
      font-size: 28px;
      font-weight: bold;
    }
  }
  .body {
    flex: 1;
    padding: 0;
    position: relative;
    &-container {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background-color: #f8f8f8;
    }
  }
  &__refresh {
    min-height: 100%;
    padding-bottom: 18px;
    background-color: #ffffff;
    background-clip: content-box;
  }
  &__goods {
    &-item {
      padding: 0;
    }
  }
  .footer {
    flex: 128px 0 0;
  }
  .item-wrap {
    padding: 40px;
  }
  &--disable {
    pointer-events: none;
  }
}
</style>
