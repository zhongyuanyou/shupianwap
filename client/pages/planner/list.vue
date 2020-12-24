<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 18:40:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 13:39:54
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/list.vue
-->

<template>
  <div class="list">
    <div class="head">
      <Header title="在线直选规划师">
        <template #left>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
        </template>
      </Header>
    </div>
    <div class="body">
      <SearchPopup ref="searchPopup" @onSearch="handleKeywordsSearch" />
      <sp-cell
        class="search"
        :class="[isInApp ? 'search-sticky--app' : 'search-sticky--browser']"
      >
        <div>
          <sp-nav-search
            v-model="search.keywords"
            border
            special-label
            class="search__input"
            placeholder="请输入规划师姓名"
            :disabled="true"
            @click="handleSearchFocus"
          >
            <template #left-icon>
              <my-icon name="sear_ic_sear" size="0.4rem" color="#999999" />
            </template>
          </sp-nav-search>
          <sp-dropdown-menu class="search__dropdown">
            <sp-dropdown-item
              ref="regionsDropdownItem"
              :disabled="!regionsOption || !regionsOption.length"
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
    <sp-toast ref="spToast" />
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
import SpToast from '@/components/common/spToast/SpToast'

import imHandle from '@/mixins/imHandle'

import { planner, dict } from '@/api'
import { callPhone, parseTel } from '@/utils/common'

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
    SpToast,
  },
  mixins: [imHandle],
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
      isInApp: (state) => state.app.isInApp,
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
      // const regionDto = {
      //   codeState: region.name === '区域' ? 2 : 3,
      //   regions: [code],
      // }
      // TODO 测试数据
      const regionDto = {
        codeState: 1,
        regions: ['110000'],
      }

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

    onLeftClick() {
      console.log('nav onClickLeft')
      this.uPGpBack()
    },
    handleRegionsSelect(data) {
      console.log(data)
      if (this.currentCity.code !== data[0].code) return
      const { code, name } = data[1] || {}
      this.search.region = {
        code,
        name: name === '不限' ? '区域' : name,
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
          console.log('发起IM', data)
          this.uPIM(data)
          break
        case 'tel':
          console.log('想打电话：', data)
          this.uPCall(data)
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

    uPGpBack() {
      if (this.isInApp) {
        this.$appFn.dggCloseWebView()
        return
      }
      this.$router.go(-1)
    },

    // 统一平台 区域设置
    uPGetRegion() {
      // app 上获取区域code
      if (this.isInApp) {
        this.$appFn.dggCityCode((res) => {
          const { code, data } = res || {}
          if (code !== 200)
            return this.$refs.spToast.show({
              message: '当前区域获取失败',
              duration: 1000,
              forbidClick: true,
            })
          const { adCode, cityName } = data
          console.log('dggCityCode:', res)
          this.getRegionList(adCode)
          this.SET_CITY({ code: adCode, name: cityName }) // 设置当前的定位到vuex中
        })
        return
      }

      // 浏览器上逻辑
      const { code } = this.currentCity || {}
      this.getRegionList(code)
    },

    // 拨打电话号码
    uPCall(data) {
      const { ciphertext } = data || {}
      const telNumber = parseTel(ciphertext)
      console.log('telNumber:', telNumber)
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggCallPhone({ phone: telNumber }, (res) => {
          const { code } = res || {}
          if (code !== 200) Toast('拨号失败！')
        })
        return
      }
      // 浏览器中调用的
      callPhone(telNumber)
    },

    // 发起聊天
    uPIM(data = {}) {
      const { mchUserId } = data
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        // TODO 调用IM 暂无
        return
      }
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      this.creatImSessionMixin({ imUserId: mchUserId, imUserType })
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
    .search-sticky--browser {
      top: -30px;
    }
    .search-sticky--app {
      top: -120px;
    }
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
