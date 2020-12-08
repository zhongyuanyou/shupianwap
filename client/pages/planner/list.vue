<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 18:40:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 13:53:16
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/list.vue
-->

<template>
  <div class="list">
    <div class="head">
      <Header title="在线直选规划师" @leftClickFuc="onClickLeft" />
    </div>
    <div class="body">
      <sp-cell class="search">
        <div>
          <sp-nav-search
            v-model="search.keywords"
            border
            special-label
            placeholder="请输入业务或规划师姓名"
            @focus="focSearch"
          >
            <template #left-icon>
              <my-icon name="sear_ic_sear" size="0.4rem" color="#999999" />
            </template>
          </sp-nav-search>
          <sp-dropdown-menu class="search__dropdown">
            <sp-dropdown-item
              ref="item"
              :title-class="regions != '区域' ? 'title-style' : ''"
              class="search__dropdown-regoin"
            >
              <template #title>
                <span>{{ regions }}</span>
              </template>
              <CoupleSelect
                :multiple="false"
                :city-data="city"
                @select="coupleSelect"
              />
            </sp-dropdown-item>
            <sp-dropdown-item
              v-model="search.scoreSort"
              :title-class="search.scoreSort > 0 ? 'title-style' : ''"
              class="search__dropdown-sort"
              :options="option"
            />
          </sp-dropdown-menu>
        </div>
      </sp-cell>
      <SearchPopup ref="SearchPopup" @enterData="enterData" />

      <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <sp-list
          v-model="loading"
          :finished="finished"
          :finished-text="list.length > 0 ? '没有更多了' : ''"
          @load="onLoad"
        >
          <template v-if="list && list.length">
            <sp-cell v-for="item in list" :key="item">
              <div class="item">
                <div class="left">
                  <div class="item_avatar">
                    <sp-image
                      width="1.2rem"
                      height="1.6rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                  </div>
                  <div class="item_detail">
                    <h4>
                      <span class="item_detail--name">黄橙橙</span>
                    </h4>

                    <p class="item_detail--address">
                      顶呱呱·跳伞塔·桃源办公中心.一楼
                    </p>
                    <div class="item_detail--tag-list">
                      <sp-tag color="#F8F8F8" text-color="#999999"
                        >服务标杆</sp-tag
                      >
                      <sp-tag color="#F8F8F8" text-color="#999999"
                        >态度真诚热情</sp-tag
                      >
                    </div>
                    <div class="item_detail--data">
                      <div class="data-item">
                        <h5>95</h5>
                        <p>历史成交</p>
                      </div>
                      <div class="vertical-line"></div>
                      <div class="data-item">
                        <h5>4.9</h5>
                        <p>用户评价</p>
                      </div>
                      <div class="vertical-line"></div>
                      <div class="data-item">
                        <h5>154</h5>
                        <p>薯片分</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="item_contact">
                    <sp-button round class="contact-btn"
                      ><my-icon
                        class=""
                        name="notify_ic_chat"
                        size="0.32rem"
                        color="#4974F5"
                    /></sp-button>

                    <sp-button round class="contact-btn"
                      ><my-icon
                        class=""
                        name="notify_ic_chat"
                        size="0.32rem"
                        color="#4974F5"
                    /></sp-button>
                  </div>
                </div>
              </div>
            </sp-cell>
          </template>
          <template v-else>
            <div class="no-data">
              <sp-image
                class="no-data__icon"
                fit="cover"
                :src="require('../../assets/images/search-null.png')"
              />
              <div class="no-data__descript">抱歉，未搜索到对应的规划师</div>
              <div class="no-data__tip">换个条件试试</div>
            </div>
          </template>
        </sp-list>
      </sp-pull-refresh>
      <div v-if="!list || !list.length" class="recommend">
        <h3 class="recommend__title">为你推荐规划师</h3>
        <div class="recommend-list">
          <sp-cell v-for="item in recommendList" :key="item" class="item-wrap">
            <div class="item">
              <div class="left">
                <div class="item_avatar">
                  <sp-image
                    width="1.2rem"
                    height="1.6rem"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <div class="item_detail">
                  <h4>
                    <span class="item_detail--name">黄橙橙</span>
                  </h4>

                  <p class="item_detail--address">
                    顶呱呱·跳伞塔·桃源办公中心.一楼
                  </p>
                  <div class="item_detail--tag-list">
                    <sp-tag color="#F8F8F8" text-color="#999999"
                      >服务标杆</sp-tag
                    >
                    <sp-tag color="#F8F8F8" text-color="#999999"
                      >态度真诚热情</sp-tag
                    >
                  </div>
                  <div class="item_detail--data">
                    <div class="data-item">
                      <h5>95</h5>
                      <p>历史成交</p>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="data-item">
                      <h5>4.9</h5>
                      <p>用户评价</p>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="data-item">
                      <h5>154</h5>
                      <p>薯片分</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="item_contact">
                  <sp-button round class="contact-btn"
                    ><my-icon
                      name="notify_ic_chat"
                      size="0.32rem"
                      color="#4974F5"
                  /></sp-button>

                  <sp-button round class="contact-btn"
                    ><my-icon
                      name="notify_ic_tel"
                      size="0.32rem"
                      color="#4974F5"
                  /></sp-button>
                </div>
              </div>
            </div>
          </sp-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Button,
  DropdownMenu,
  DropdownItem,
  NavSearch,
  Toast,
  PullRefresh,
  List,
  Cell,
  Image,
  Tag,
  Icon,
} from '@chipspc/vant-dgg'

import CoupleSelect from '@/components/common/coupleSelected/CoupleSelect'
import Header from '@/components/common/head/header'
import SearchPopup from '@/components/planner/SearchPopup'
import { city } from '@/utils/city'

export default {
  name: 'List',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [NavSearch.name]: NavSearch,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Icon.name]: Icon,
    Header,
    CoupleSelect,
    SearchPopup,
  },
  data() {
    return {
      list: [],
      recommendList: [],
      loading: false,
      finished: false,
      refreshing: false,
      regions: '区域',
      search: { keywords: '', scoreSort: 0 },
      option: [
        { text: '薯片分从高到底', value: 0 },
        { text: '客户评价分从高到低', value: 1 },
        { text: '成交量从高到低', value: 2 },
        { text: '价格从高到低', value: 3 },
        { text: '价格从低到高', value: 4 },
      ],
    }
  },
  computed: {
    city() {
      return city
    },
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
    coupleSelect(data) {
      console.log(data)
      if (data[2].regions.length) {
        this.regions = data[2].regions[0].name
        this.$refs.item.toggle()
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          // this.list.push(this.list.length + 1)
          this.recommendList.push(this.list.length + 1)
        }
        this.list = []
        this.loading = false

        if (!this.list.length || this.list.length >= 40) {
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
    focSearch() {
      this.$refs.SearchPopup.focSearch()
    },
    enterData(data) {
      //  获取子组件异步结果
      console.log(data)
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.list {
  height: 100%;
  overflow-y: scroll;
  /deep/div {
    font-size: 24px;
  }
  .head {
  }
  .body {
    padding: 0;
    .search {
      position: sticky;
      top: -30px;
      z-index: 10;
      padding: 16px 40px;
      /deep/.sp-field__control {
        font-size: 30px;
        font-weight: bold;
      }
      /deep/.sp-dropdown-menu {
        &__bar {
          box-shadow: none;
          height: 90px;
        }
        &__item {
          flex: 100px 0 1;
          padding: 0 20px;
          justify-content: flex-start;
          &:first-child {
            flex-basis: 150px;
          }
          &:last-child {
            margin-left: 40px;
            flex-basis: 350px;
          }
        }
        &__title {
          color: #222222;
          &--active {
            color: @main-color;
          }
          & > div {
            font-size: 26px;
            font-weight: 400;
          }
        }
      }
      &::after {
        left: 0;
        right: 0;
      }
      /deep/.title-style {
        //下拉标题样式
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4974f5;
        line-height: 28px;
      }
    }
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
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .item-wrap {
    padding: 40px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      display: flex;
      align-items: flex-start;
      flex: 1;
    }
    .right {
      position: relative;
      flex: 100px 0 1;
    }
    &_avatar {
      img {
        border-radius: 4px;
      }
    }
    &_detail {
      padding-left: 34px;
      h4 {
        display: flex;
      }
      &--name {
        font-size: 32px;
        font-weight: bold;
        color: @title-text-color;
        line-height: 36px;
        margin-right: 16px;
      }
      &--address {
        max-width: 330px;
        font-size: 24px;
        font-weight: 400;
        color: @title-text-color;
        line-height: 28px;
        margin-top: 20px;
        .textOverflow(1);
      }
      &--tag-list {
        margin-top: 12px;
        line-height: 1;
        font-size: 22px;
      }
      &--data {
        display: flex;
        margin-top: 20px;
        .data-item {
          font-weight: 400;
          padding: 0 30px;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            padding-right: 0;
          }
          h5 {
            font-size: 36px;
            font-family: Bebas;
            color: #222222;
            line-height: 40px;
          }
          p {
            margin-top: 8px;
            font-size: 24px;
            color: #999999;
            line-height: 28px;
          }
        }
        .vertical-line {
          .vertical-line(@height:70px; @bgColor:#E5E5E5; @skewX:-15deg;);
        }
      }
    }
    &_contact {
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      .contact-btn {
        width: 64px;
        height: 64px;
        background: #ebf3ff;
      }
    }
  }
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__icon {
      width: 340px;
      height: 202px;
      margin-top: 64px;
    }
    &__descript {
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-top: 38px;
    }
    &__tip {
      font-size: 24px;
      font-weight: 400;
      color: #cdcdcd;
      line-height: 28px;
      margin-top: 16px;
    }
  }
}
</style>
