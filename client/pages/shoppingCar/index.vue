<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 11:50:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 17:21:59
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
              :key="item"
              class="shopping-car__goods-item"
            >
              <GoodsItem
                :status="index === 1 ? 'offShelf' : 'sale'"
                :commodity-data="item"
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
      <div class="recommend">
        <h3 class="recommend__title">为您推荐</h3>
        <div
          v-if="recommendList && recommendList.length"
          class="recommend-list"
        >
          <GoodsPro
            v-for="item in recommendList"
            :key="item"
            class="item-wrap"
          />
        </div>
        <sp-loading v-else />
      </div>
    </div>
    <div class="footer sp-hairline--top">
      <Bottombar :status="shoppingCarStatus" />
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
    const userId = store.state.user.userInfo.userId || '123456'
    try {
      const data = await shoppingCar.list({ userId })
      return { asyncData: data }
    } catch (error) {}
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
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    this.getRecommendList()
  },
  methods: {
    onClickLeft() {
      console.log('nav onClickLeft')
    },
    onClickRight() {
      console.log('nav onClickRight')
      this.shoppingCarStatus =
        this.shoppingCarStatus === 'completed' ? 'edit' : 'completed'
    },

    onLoad() {
      setTimeout(() => {}, 1000)
      this.getList()
        .then((data) => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          this.loading = false
          this.finished = true

          this.list = data
          // for (let i = 0; i < 2; i++) {
          // this.list.push(this.list.length + 1)
          // }
          // if (!this.list.length || this.list.length >= 4) {
          //   this.finished = true
          // }
        })
        .catch(() => {
          this.error = true
          this.loading = false
          for (let i = 0; i < 2; i++) {
            this.list.push(this.list.length + 1)
          }
          if (!this.list.length || this.list.length >= 4) {
            this.finished = true
          }
        })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    handleItemOperation(value = {}) {
      const { type, item } = value
      console.log('type:', type)
      switch (type) {
        case 'detele':
          this.deteleItem(item)
          break
        case 'attention':
          this.attentionItem(item)
          break
      }
    },
    deteleItem(item) {
      this.$refs.goodsPopup.open('detele').then(() => {
        console.log('发起请求')
      })
    },
    attentionItem() {},

    // 请求购物车列表
    async getList() {
      try {
        const userId = this.userInfo.userId || '123456'
        let data = await shoppingCar.list({ userId })
        console.log(data)
        if (!Array.isArray(data)) data = []
        return data
      } catch (error) {
        console.error('getList:', error)
        return Promise.reject(error)
      }
    },

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
