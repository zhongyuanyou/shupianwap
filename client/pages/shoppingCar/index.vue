<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 11:50:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-21 11:55:55
 * @Description: 购物车页面
 * @FilePath: /chips-wap/client/pages/shoppingCar/index.vue
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
            class="head__icon-back"
            @click="onClickLeft"
          />
        </template>
        <template #right>
          <span class="head__operation" @click="onClickRight">{{
            shoppingCarStatus === 'edit' ? '完成' : '管理'
          }}</span>
        </template>
      </Header>
    </div>
    <div class="body">
      <div v-if="updateLoading" class="update-loading">
        <sp-loading class="update-loading__content" color="#4974f5" />
      </div>

      <div class="shopping-car__content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
                :status="index === 1 ? 'offShelf' : 'sale'"
                :commodity-data="item"
                :user-id="userInfo.userId"
                @operation="handleItemOperation"
              />
            </div>
            <template #finished>
              <span v-if="list && list.length">没有更多了</span>
              <ShoppingCarNull v-else />
            </template>
          </sp-list>
        </sp-pull-refresh>
      </div>
      <!-- 推荐列表 -->
      <div v-if="recommendList && recommendList.length" class="recommend">
        <h3 class="recommend__title">为您推荐</h3>
        <div class="recommend-list">
          <GoodsPro
            v-for="item in recommendList"
            :key="item"
            class="item-wrap"
          />
        </div>
      </div>
    </div>
    <div class="footer sp-hairline--top">
      <Bottombar
        :status="shoppingCarStatus"
        :bottom-data="bottomData"
        @operation="handleItemOperation"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  TopNavBar,
  Button,
  Toast,
  PullRefresh,
  List,
  Loading,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'

import GoodsPro from '@/components/planner/GoodsPro'
import GoodsItem from '@/components/shoppingCar/GoodsItem'
import Bottombar from '@/components/shoppingCar/Bottombar'
import GoodsPopup from '@/components/shoppingCar/GoodsPopup'
import ShoppingCarNull from '@/components/shoppingCar/ShoppingCarNull'

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
    [Loading.name]: Loading,
    Header,
    GoodsPopup,
    GoodsPro,
    GoodsItem,
    Bottombar,
    ShoppingCarNull,
  },
  async asyncData({ store }) {
    // const userId = store.state.user.userInfo.userId || '1234567'
    // try {
    //   const data = await shoppingCar.list({ userId })
    //   return { asyncData: data }
    // } catch (error) {}
  },
  data() {
    return {
      list: [],
      recommendList: [],
      refreshing: false,
      loading: false,
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
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
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
  created() {
    if (process && process.client) {
      this.postUpdate({ type: 'init' })
      this.getRecommendList()
    }
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    onClickLeft() {
      console.log('nav onClickLeft')
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
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    handleItemOperation(value = {}) {
      const { type, data, cartId } = value
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
        case 'refresh':
          this.refreshing = true
          this.onRefresh()
          break
        case 'resourceServiceSelect': // sku弹出框里资源服务
          this.selecteResourceService(cartId, data)

          break
      }
    },
    // 删除列表
    deteleItem(cartId, data) {
      this.$refs.goodsPopup
        .open('detele')
        .then(() => {
          console.log('发起请求')
          console.log('countOperation:', cartId, data)
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
        })
    },

    // 全删除
    deteleAllItem() {
      if (this.currentSelectedCartIds.length === 0) {
        Toast('请选择需要删除的商品')
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
      this.selectItem(cartId, data)
    },
    // 资源服务的选择
    selecteResourceService(cartId, value) {
      const { type, classCode } = value
      switch (type) {
        case 'registerAddress':
          this.$router.push({
            name: 'detail-selectAddress',
            query: { classCode, redirectType: 'wap', redirect: '/shoppingcar' },
          })
          break
        case 'phone':
          this.$router.push({
            name: 'detail-selectPhone',
            query: { classCode, redirectType: 'wap', redirect: '/shoppingcar' },
          })
          break
      }
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
              this.currentSelectedCartIds.push(cartId)
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
      } catch (error) {}
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
          // 增加数量， 减少数量， 默认选中
          let shopIsSelected = item.shopIsSelected
          if (cartArray.includes(item.cartId)) {
            goodsNumber = value
            shopIsSelected = true
          }
          return { ...item, goodsNumber, shopIsSelected }
        })
      } catch (error) {}
    },

    // 请求购物车列表
    async getList() {
      try {
        const userId = this.userInfo.userId || '1234567'
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
      let params = {}
      switch (type) {
        case 'updateNum':
          // 增加数量， 减少数量， 默认选中
          params = { goodsNumber: value, selectFlag: 1 }
          break
        case 'remove':
          break
        case 'updateSkuItem':
          params = { serviceList, skuAttr, skuId, goodsNumber: value }
          break
        case 'select':
          params = { selectFlag: +value } // 将boolean转换为数字（1：选中 ,0：取消选中）
          break
        case 'init':
          // TODO id, createrId 为空
          params = { id: '12233', createrId: '324' }
      }
      try {
        this.updateLoading = true
        const userId = this.userInfo.userId || '1234567'
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

    // 请求推荐产品列表
    getRecommendList() {
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.recommendList.push(this.recommendList.length + 1)
        }
      }, 50000)
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.flex-r-s {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.flex-r-c {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.flex-r-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-r-a-s {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.flex-r-a-c {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.shopping-car {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  .head {
    &__icon-back {
      padding-left: 32px;
    }
    &__operation {
      padding-right: 40px;
      font-size: 28px;
      font-weight: bold;
    }
  }
  .body {
    flex: 1;
    padding: 0;
    overflow-y: scroll;
    position: relative;
    // TODO  遮罩层 有问题
    .update-loading {
      position: absolute;
      width: auto;
      height: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  &__goods {
    &-item {
      padding: 0;
    }
  }
  .footer {
    flex: 128px 0 0;
  }
  .recommend {
    &__title {
      padding: 0 40px;
      font-size: 40px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 44px;
      margin-bottom: 6px;
    }
  }
  .item-wrap {
    padding: 40px;
  }
}
</style>
