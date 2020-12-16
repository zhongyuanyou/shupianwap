<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 18:40:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-15 16:02:05
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/list.vue
-->

<template>
  <div class="list">
    <div class="head">
      <Header title="在线直选规划师" />
    </div>
    <div class="body">
      <SearchPopup ref="searchPopup" @onSearch="handleKeywordsSearch" />
      <sp-cell class="search">
        <div>
          <sp-nav-search
            v-model="search.keywords"
            border
            special-label
            class="search__input"
            placeholder="请输入规划师姓名"
            @focus="handleSearchFocus"
          >
            <template #left-icon>
              <my-icon name="sear_ic_sear" size="0.4rem" color="#999999" />
            </template>
          </sp-nav-search>
          <sp-dropdown-menu class="search__dropdown">
            <sp-dropdown-item
              ref="regionsDropdownItem"
              :title-class="
                search.region.name != '区域'
                  ? 'sp-dropdown-menu__title--selected '
                  : ''
              "
              class="search__dropdown-regoin"
            >
              <template #title>
                <span>{{ search.region.name }}</span>
              </template>
              <CoupleSelect
                :multiple="false"
                :city-data="regionsOption"
                :is-location="true"
                @select="handleRegionsSelect"
              />
            </sp-dropdown-item>
            <sp-dropdown-item
              v-model="search.sortId"
              :title-class="
                search.sortId > 0 ? 'sp-dropdown-menu__title--selected' : ''
              "
              class="search__dropdown-sort"
              :options="sortOption"
              @change="handleSortChange"
            />
          </sp-dropdown-menu>
        </div>
      </sp-cell>
      <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <sp-list
          v-model="loading"
          error-text="请求失败，点击重新加载"
          :error.sync="error"
          :finished="finished"
          :finished-text="list.length > 0 ? '没有更多了' : ''"
          @load="onLoad"
        >
          <template v-if="list && list.length">
            <sp-cell v-for="item in list" :key="item.mchUserId">
              <PlannerSearchItem
                :item-data="item"
                @operation="handleOperation"
              />
            </sp-cell>
          </template>
          <template v-else-if="!loading">
            <div class="no-data">
              <sp-image
                class="no-data__icon"
                fit="cover"
                :src="require('../../assets/images/search-null.png')"
              />
              <template v-if="!error">
                <div class="no-data__descript">抱歉，未搜索到对应的规划师</div>
                <div class="no-data__tip">换个条件试试</div>
              </template>
            </div>
          </template>
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import {
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
} from '@chipspc/vant-dgg'

import CoupleSelect from '@/components/common/coupleSelected/CoupleSelect'
import Header from '@/components/common/head/header'
import SearchPopup from '@/components/planner/SearchPopup'
import PlannerSearchItem from '@/components/planner/PlannerSearchItem'

import { planner, dict } from '@/api'

const SORT_CONFIG = [
  {
    type: 'pointSort', // 排序类型
    sortValue: 1, // 升序
    text: '薯片分从高到底',
    value: 0,
  },
  {
    type: 'pointSort',
    sortValue: 2, // 降序
    text: '薯片分从底到高',
    value: 1,
  },
  {
    type: 'reputationSort',
    sortValue: 1, // 升序
    text: '客户评价分从高到低',
    value: 2,
  },
  {
    type: 'reputationSort',
    sortValue: 2, // 降序
    text: '客户评价分从低到高',
    value: 3,
  },
  {
    type: 'payNumSort',
    sortValue: 1, // 升序
    text: '成交量从高到低',
    value: 4,
  },
  {
    type: 'payNumSort',
    sortValue: 2, // 降序
    text: '成交量从低到高',
    value: 5,
  },
]

const DEFAULT_PAGE = {
  limit: 10,
  page: 1,
  totalCount: 0,
}

export default {
  name: 'List',
  components: {
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [NavSearch.name]: NavSearch,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    Header,
    CoupleSelect,
    SearchPopup,
    PlannerSearchItem,
  },
  data() {
    return {
      search: {
        keywords: '',
        sortId: 0,
        region: {
          name: '区域',
          code: '',
        },
      },
      sortOption: SORT_CONFIG,
      regionsOption: [],
      refreshing: false,
      loading: false,
      error: false,
      finished: false,
      pageOption: DEFAULT_PAGE,
      list: [],
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
    }),
    formatSearch() {
      const { sortId, keywords, region } = this.search
      const matched =
        this.sortOption.find((item) => item.value === sortId) || SORT_CONFIG[0]
      const sort = {
        sortType: matched.type,
        value: matched.sortValue,
      }
      const code = region.name === '区域' ? this.currentCity.code : region.code
      const regionDto = {
        codeState: region.name === '区域' ? 2 : 3,
        regions: [code],
      }
      // const regionDto = {
      //   codeState: 1,
      //   regions: ['110000'],
      // }

      return { sort, plannerName: keywords, regionDto }
    },
  },
  created() {
    if (process && process.client) {
      this.uPGetRegion()
    }
  },
  methods: {
    ...mapMutations({
      SET_CITY: 'city/SET_CITY',
    }),
    handleRegionsSelect(data) {
      console.log(data)
      // TODO 测试
      if (this.currentCity.code !== data[0].code) return
      const { code, name } = data[1]
      this.search.region = {
        code,
        name,
      }
      this.$refs.regionsDropdownItem.toggle()
      this.handleSearch()
    },
    handleSortChange(value) {
      console.log(value)
      // 触发 formatSearch 计算
      this.search.sortId = value
      this.handleSearch()
    },
    onLoad() {
      let currentPage = this.pageOption.page
      if (!this.refreshing && this.list.length && currentPage >= 1) {
        currentPage += 1
      } else if (this.refreshing) {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }
      this.getList(currentPage)
        .then((data) => {
          console.log(data)
          this.loading = false
          if (this.list.length >= this.pageOption.totalCount) {
            this.finished = true
          }
        })
        .catch(() => {
          console.log('sdf')
          this.error = true
          this.loading = false
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    handleSearchFocus() {
      this.$refs.searchPopup.openSearchPopup()
    },
    handleKeywordsSearch(data = {}) {
      const { keywords } = data
      this.search.keywords = keywords
      this.handleSearch()
    },

    handleOperation(value = {}) {
      const { type, data } = value
      switch (type) {
        case 'IM':
          console.log('发起IM')
          break
        case 'tel':
          console.log('想打电话：', data)
          break
        case 'detail':
          console.log('看看详情：', data)
          this.$router.push({ name: 'planner-id', query: data })
          break
      }
    },

    handleSearch() {
      this.refreshing = true
      this.onRefresh()
    },
    // 统一平台 调用
    uPGetRegion() {
      // 浏览器上逻辑
      const { code } = this.currentCity || {}
      this.getRegionList(code)
      // TODO app 上获取code
      // this.SET_CITY({code, name}) // 设置当前的定位到vuex中
    },

    async getList(currentPage) {
      const { limit } = this.pageOption
      const { sort, plannerName, regionDto } = this.formatSearch
      const params = { sort, plannerName, regionDto, limit, page: currentPage }
      try {
        const data = await planner.list(params)
        console.log(data)
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        if (data) {
          const { limit, currentPage = 1, totalCount = 0, records = [] } = data
          this.pageOption = { limit, totalCount, page: currentPage }
          this.list.push(...records)
          Toast(`共找到${totalCount}个规划师`)
        }
        return data
      } catch (error) {
        if (this.refreshing) {
          this.refreshing = false
        }
        console.error('getList:', error)
        return Promise.reject(error)
      }
    },

    // 获取区域数据
    async getRegionList(code) {
      try {
        const data = await dict.findCmsTier({ axios: this.$axios }, { code })
        console.log(data)
        this.regionsOption = [
          {
            ...this.currentCity,
            children: Array.isArray(data) ? data : [],
          },
        ]
        return data
      } catch (error) {
        console.error('getRegionList:', error)
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

.list {
  height: 100%;
  overflow-y: scroll;
  .head {
  }
  .body {
    padding: 0;
    .search {
      position: sticky;
      top: -30px;
      z-index: 10;
      padding: 0 40px;
      &__input {
        height: 96px;
        margin: 16px 0;
        /deep/.sp-field__control {
          font-size: 30px;
          font-weight: bold;
        }
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
            flex-basis: 200px;
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
          .sp-ellipsis {
            font-size: 26px;
            font-weight: 400;
          }
        }
        // 选中的样式
        .sp-dropdown-menu__title--selected {
          color: #4974f5;
          line-height: 28px;
          .sp-ellipsis {
            font-weight: bold;
            font-size: 32px;
          }
        }
      }
      &::after {
        left: 0;
        right: 0;
      }
    }
  }

  .item-wrap {
    padding: 40px;
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
