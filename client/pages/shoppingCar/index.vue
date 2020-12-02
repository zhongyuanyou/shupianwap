<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 11:50:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 17:31:19
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/shoppingCar/commodityConsultation.vue
-->

<template>
  <div class="shopping-car">
    <GoodsPopup ref="goodsPopup" />
    <div class="head">
      <sp-top-nav-bar
        title="购物车"
        left-arrow
        ellipsis
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A" />
        </template>
        <template #right>
          <span>{{ shoppingCarStatus === 'edit' ? '完成' : '管理' }}</span>
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="body">
      <div class="shopping-car__content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <sp-list
            v-model="loading"
            class="shopping-car__goods"
            finished-text="没有更多了"
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
                @operation="handleItemOperation"
              />
            </div>
          </sp-list>
        </sp-pull-refresh>
      </div>
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
      <Bottombar :status="shoppingCarStatus" />
    </div>
  </div>
</template>

<script>
import { TopNavBar, Button, Toast, PullRefresh, List } from '@chipspc/vant-dgg'

import GoodsPro from '@/components/planner/GoodsPro'
import GoodsItem from '@/components/shoppingCar/GoodsItem'
import Bottombar from '@/components/shoppingCar/Bottombar'
import GoodsPopup from '@/components/shoppingCar/GoodsPopup'

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
    GoodsPopup,
    GoodsPro,
    GoodsItem,
    Bottombar,
  },
  data() {
    return {
      list: [],
      recommendList: [],
      loading: false,
      finished: false,
      refreshing: false,
      shoppingCarStatus: 'completed', // edit: 编辑
    }
  },
  computed: {},
  created() {
    this.getList()
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
    getList() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.recommendList.push(this.recommendList.length + 1)
        }
        this.loading = false
      }, 1000)
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 2; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (!this.list.length || this.list.length >= 4) {
          this.finished = true
        }
      }, 1000)
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
    position: sticky;
    top: 0;
    z-index: 100;
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
