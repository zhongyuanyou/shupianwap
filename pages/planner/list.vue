<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 18:40:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-19 11:33:33
 * @Description: file content
 * @FilePath: /chips-wap/pages/planner/list.vue
-->

<template>
  <div class="list">
    <div ref="head" class="head">
      <Header title="在线直选规划师">
        <template #left>
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.4rem"
            @click.native="onLeftClick"
          ></my-icon>
        </template>
      </Header>
    </div>
    <div class="body">
      <!-- 放在输入框一堆堆，在iphone里面有问题，需要放在滚动区域外面，否在样式有问题 ，只能放在页面最外层了-->
      <SearchPopup ref="searchPopup" @onSearch="handleKeywordsSearch" />
      <div class="body-container">
        <div class="search">
          <!-- S 搜索输入框 -->
          <Search
            v-model="search.keywords"
            placeholder="请输入规划师姓名"
            :disabled="true"
            @clickInputHandle="handleSearchFocus"
          />
          <!-- E 搜索输入框 -->
          <!-- S 下拉筛选条件 -->
          <sp-sticky class="sticky-dropdown" :offset-top="headHeight">
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
                ref="sortDropdown"
                class="search__dropdown-sort"
                :title-class="
                  search.sortId > 0 ? 'sp-dropdown-menu__title--selected' : ''
                "
                :title="search.sortText"
              >
                <div class="search__dropdown-sort-content">
                  <sp-cell
                    v-for="(item, index) in sortOption"
                    :key="index"
                    :title="item.text"
                    :class="{
                      active: item.value === search.sortId,
                    }"
                    @click="handleSortChange(item)"
                  >
                    <template #right-icon>
                      <my-icon
                        v-show="item.value === search.sortId"
                        name="tab_ic_check"
                        size="0.22rem"
                        color="#4974f5"
                      />
                    </template>
                  </sp-cell>
                </div>
              </sp-dropdown-item>
            </sp-dropdown-menu>
          </sp-sticky>
          <!-- E 下拉筛选条件 -->
        </div>
        <sp-pull-refresh
          v-model="refreshing"
          class="list-refresh"
          @refresh="onRefresh"
        >
          <sp-list
            v-model="loading"
            error-text="请求失败，点击重新加载"
            :error.sync="error"
            :finished="finished"
            :finished-text="list.length > 0 ? '没有更多了' : ''"
            @load="onLoad"
          >
            <template v-if="list && list.length">
              <sp-cell
                v-for="item in list"
                :key="item.mchUserId"
                class="list-cell"
              >
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
                  src="https://cdn.shupian.cn/sp-pt/wap/images/9cxcgh1a0t80000.png"
                />
                <template v-if="!error">
                  <div class="no-data__descript">
                    抱歉，未搜索到对应的规划师
                  </div>
                  <div class="no-data__tip">换个条件试试</div>
                </template>
              </div>
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
    <client-only>
      <openApp />
    </client-only>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import {
  Sticky,
  Button,
  DropdownMenu,
  DropdownItem,
  Toast,
  PullRefresh,
  List,
  Cell,
  Image,
  Tag,
} from '@chipspc/vant-dgg'

import CoupleSelect from '@/components/common/coupleSelected/CoupleSelect'
import Header from '@/components/common/head/header'
import Search from '@/components/common/search/Search'
import SearchPopup from '@/components/planner/SearchPopup'
import PlannerSearchItem from '@/components/planner/PlannerSearchItem'
import LoadingDown from '@/components/common/loading/LoadingDown'

import imHandle from '@/mixins/imHandle'

import { planner, dict } from '@/api'
import { callPhone, parseTel } from '@/utils/common'

const SORT_CONFIG = [
  {
    type: 'pointSort', // 排序类型
    sortValue: 2, // 降序
    text: '薯片分从高到低',
    value: 0,
  },
  {
    type: 'pointSort',
    sortValue: 1, // 升序
    text: '薯片分从低到高',
    value: 1,
  },
  {
    type: 'reputationSort',
    sortValue: 2, // 降序
    text: '客户评价分从高到低',
    value: 2,
  },
  {
    type: 'reputationSort',
    sortValue: 1, // 升序
    text: '客户评价分从低到高',
    value: 3,
  },
  {
    type: 'payNumSort',
    sortValue: 2, // 降序
    text: '成交量从高到低',
    value: 4,
  },
  {
    type: 'payNumSort',
    sortValue: 1, // 升序
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
  name: 'PlannerList',
  components: {
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    Header,
    CoupleSelect,
    SearchPopup,
    PlannerSearchItem,
    LoadingDown,
    Search,
  },
  mixins: [imHandle],
  data() {
    return {
      headHeight: '0.88rem',
      search: {
        keywords: '',
        sortId: 0,
        sortText: '薯片分从高到低',
        region: {
          name: '区域',
          code: '',
        },
      },
      sortOption: SORT_CONFIG,
      regionsOption: [],
      refreshing: false,
      loading: true,
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
      userInfo: (state) => state.user.userInfo,
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
      // TODO 测试数据
      // const regionDto = {
      //   codeState: 1,
      //   regions: ['110000'],
      // }
      return { sort, plannerName: keywords, regionDto }
    },
  },
  created() {
    if (process && process.client) {
      this.uPGetCurrentRegion().then((data) => {
        const { code } = data || {}
        this.onLoad()
        this.getRegionList(code)
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.headHeight = this.$refs.head.clientHeight
      console.log('this.headHeight:', this.headHeight)
    })
  },
  methods: {
    ...mapMutations({
      SET_CITY: 'city/SET_CITY',
      SET_USERY: 'user/SET_USERY',
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
    handleSortChange(item) {
      const { value, text } = item || {}
      console.log(value)
      // 触发 formatSearchParams 计算
      this.search.sortText = text
      this.search.sortId = value
      this.$refs.sortDropdown.toggle()
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
          this.$router.push({
            name: 'planner-detail',
            query: data,
          })
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
    uPGetCurrentRegion() {
      return new Promise((resolve, reject) => {
        const { code } = this.currentCity || {}
        if (code) {
          resolve({ code })
          return
        }
        // app 上获取区域code
        if (this.isInApp) {
          this.$appFn.dggCityCode((res) => {
            const { code, data } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '当前区域获取失败',
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
              reject(res)
              return
            }

            const { adCode, cityName } = data
            console.log('dggCityCode:', res)
            this.SET_CITY({ code: adCode, name: cityName }) // 设置当前的定位到vuex中
            resolve({ code: adCode })
          })
        }
      })
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
          if (code !== 200) {
            this.$xToast.show({
              message: '拨号失败！',
              duration: 1000,
              forbidClick: true,
              icon: 'toast_ic_remind',
            })
          }
        })
        return
      }
      // 浏览器中调用的
      callPhone(telNumber)
    },

    // 发起聊天
    async uPIM(data = {}) {
      const { mchUserId, userName } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          await this.getUserInfo()
          this.$appFn.dggOpenIM(
            {
              name: userName,
              userId: mchUserId,
              userType: 'MERCHANT_USER',
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        } catch (error) {
          console.error('uPIM error:', error)
        }
        return
      }
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      this.creatImSessionMixin({ imUserId: mchUserId, imUserType })
    },

    // app获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.userInfo.userId) {
          resolve(this.userInfo.userId)
          return
        }
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          // 未登录需要登录
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {
              if (loginRes && loginRes.code === 200) {
                console.log('loginRes : ', loginRes)
                if (
                  loginRes.data &&
                  loginRes.data.userId &&
                  loginRes.data.token
                ) {
                  this.SET_USERY(loginRes.data)
                  resolve(loginRes.data.userId)
                  return
                }
                reject(new Error('登录后userId或者token缺失'))
                return
              }
              reject(new Error('登录失败'))
            })
            return
          }
          if (data && data.userId && data.token) {
            this.SET_USERY(data)
            resolve(data.userId)
            return
          }
          reject(new Error('用户信息中userId或者token缺失'))
        })
      })
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
          // 第一页面请求提示
          if (currentPage === 1) {
            this.$xToast.show({
              message: `共找到${totalCount}个规划师`,
              duration: 1000,
              forbidClick: true,
              icon: 'toast_ic_comp',
            })
          }
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
        if (Array.isArray(data) && data.length) {
          this.regionsOption = [
            {
              ...this.currentCity,
              children: Array.isArray(data) ? data : [],
            },
          ]
        }

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
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  .head {
    background: #ffffff;
  }
  .body {
    flex: 1;
    padding: 0;
    position: relative;
    &-container {
      // 为了在flex：1中，解决height:100%失效的问题
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // 为了ios 滚动流畅
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .search {
      &__dropdown {
        background-color: #ffffff;
      }
      &__dropdown-sort-content {
        .sp-cell {
          padding: 18px 40px;
          &::after {
            display: none;
          }
          &:last-child {
            margin-bottom: 40px;
          }
          &.active {
            font-weight: bold;
            color: #4974f5;
          }
        }
      }
      /deep/.sticky-dropdown {
        .sp-sticky {
          padding-top: 0;
        }
      }
      /deep/.sp-dropdown-menu {
        padding: 0 40px;
        position: relative;
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          right: -50%;
          left: -50%;
          height: 1px;
          background-color: #ebedf0;
          transform: scale(0.5);
          z-index: 1;
        }
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
            font-size: 26px;
          }
          &::after {
            border-color: transparent transparent #4974f5 #4974f5;
          }
        }
      }
      &::after {
        left: 0;
        right: 0;
      }
    }
    .list-refresh {
      min-height: calc(100% - 218px);
    }
    .list-cell {
      padding: 40px;
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
      margin-top: 66px;
    }
    &__descript {
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-top: 24px;
    }
    &__tip {
      font-size: 24px;
      font-weight: 400;
      color: #cdcdcd;
      line-height: 28px;
      margin-top: 32px;
    }
  }
}
</style>
