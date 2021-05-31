<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 18:40:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-02 16:26:34
 * @Description: file content
 * @FilePath: /chips-wap/pages/planner/list.vue
-->

<template>
  <div class="list">
    <div ref="head" class="head">
      <Header v-if="!isApplets" title="在线直选规划师">
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
                  search.region.name != '区域' && !isChooseCategory
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
                  :back-data="backData"
                  @select="handleRegionsSelect"
                />
              </sp-dropdown-item>
              <sp-dropdown-item
                ref="sortDropdown"
                class="search__dropdown-sort"
                :title-class="
                  search.sortId > 0 && !isChooseCategory
                    ? 'sp-dropdown-menu__title--selected'
                    : ''
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
              <sp-dropdown-item
                ref="categoryCodeSelect"
                :title="search.categoryCodeName"
                :title-class="
                  isChooseCategory ? 'sp-dropdown-menu__title--selected ' : ''
                "
                class="search__dropdown-category"
              >
                <div class="category-list">
                  <div
                    v-for="(item, index) in categoryList"
                    :key="index"
                    :class="catogyActiveIndex === index ? 'active-item' : ''"
                    class="item"
                    @click="chooseCategory(index)"
                  >
                    {{ item.name }}
                  </div>
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
                <LoadingDown
                  v-show="!refreshing && loading"
                  bg-color="transparent"
                  :loading="true"
                />
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
  PullRefresh,
  List,
  Cell,
  Image,
  Tag,
  Toast,
} from '@chipspc/vant-dgg'

import CoupleSelect from '@/components/common/coupleSelected/CoupleSelect'
import Header from '@/components/common/head/header'
import Search from '@/components/common/search/Search'
import SearchPopup from '@/components/planner/SearchPopup'
import PlannerSearchItem from '@/components/planner/PlannerSearchItem'
import LoadingDown from '@/components/common/loading/LoadingDown'
import imHandle from '@/mixins/imHandle'

import { planner, dict, goods } from '@/api'
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
        categoryCodes: '',
        categoryCodeName: '全部分类',
        categoryState: 1,
      },
      sortOption: SORT_CONFIG,
      regionsOption: [],
      refreshing: false,
      loading: true,
      error: false,
      finished: false,
      pageOption: DEFAULT_PAGE,
      list: [],
      categoryList: [],
      catogyActiveIndex: 0,
      defaultCityCode: '',
      isChooseCategory: false,
      backData: [],
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      isInApp: (state) => state.app.isInApp,
      userInfo: (state) => state.user.userInfo,
      isApplets: (state) => state.app.isApplets,
      code: (state) => state.city.code,
    }),
    formatSearch() {
      const { sortId, keywords, region } = this.search
      const matched =
        this.sortOption.find((item) => item.value === sortId) || SORT_CONFIG[0]
      const sort = {
        sortType: matched.type,
        value: matched.sortValue,
      }
      const code =
        region.name === '区域'
          ? this.isApplets
            ? this.code
            : this.currentCity.code
          : region.code
      let regionDto = {
        codeState: region.name === '区域' ? 2 : 3,
        regions: [code || '510100'],
      }
      if (this.search.catogyActiveIndex !== 0) {
        regionDto = {
          codeState: 2,
          regions: [code || '510100'],
        }
      }
      return { sort, plannerName: keywords, regionDto }
    },
  },
  created() {
    if (process && process.client) {
      // notice:
      // store中的用户信息默认来自cookie，会从cookie中获取；因为在wap中， userInfo中的token与userId等 保存在cookie中，
      // 但是在app中登录等，登录信息cookie中的没有更新，导致直接从store中获取到的信息无效
      // 所以在app中进入此页面，先清除userInfo,获取最新的userInfo
      this.isInApp && this.clearUserInfo()
      if (this.$route.query.cityCode && this.$route.query.cityName) {
        this.defaultCityCode = this.$route.query.cityCode
        this.getRegionList(this.$route.query.cityCode)
        this.SET_CITY({
          code: this.$route.query.cityCode,
          name: this.$route.query.cityName,
        }) // 设置当前的定位到vuex中
        if (this.$route.query.regionCode) {
          const regionDto = {
            codeState: 2,
            regions: this.$route.query.regionCode,
          }
          this.search.regionDto = regionDto
          this.getList(1)
        }
      } else {
        this.uPGetCurrentRegion({ type: 'init' }).then((data) => {
          console.log('uPGetCurrentRegion data:', data)
          const { code } = data || {}
          this.defaultCityCode = code
          this.onLoad(true)
          this.getRegionList(code)
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.headHeight = this.$refs.head.clientHeight
    })
    this.getCategoryCodes()
  },
  methods: {
    ...mapMutations({
      SET_CITY: 'city/SET_CITY',
      setUserInfo: 'user/SET_USER',
      clearUserInfo: 'user/CLEAR_USER',
    }),
    chooseCategory(index) {
      this.catogyActiveIndex = index
      this.search.categoryCodeName = this.categoryList[index].name
      this.search.categoryCodes = this.categoryList[index].code
      this.pageOption.page = 1
      this.pageOption.limit = 10
      this.search.keywords = ''
      this.isChooseCategory = true
      if (index === 0) {
        this.search.region = {
          code: this.defaultCityCode,
          name: '不限',
          codeState: 1,
        }
        this.backData = [
          {
            code: this.defaultCityCode,
            name: '不限',
            codeState: 1,
          },
        ]
      }
      this.onLoad()
      this.$refs.categoryCodeSelect.toggle()
    },
    getCategoryCodes() {
      goods.getCategoryCodes({ axios: this.$axios }).then((res) => {
        this.categoryList = [{ name: '全部分类', code: 0 }].concat(res[0])
        if (this.$route.query && this.$route.query.categoryCode) {
          this.search.categoryCodes = this.$route.query.categoryCode
          this.isChooseCategory = true
          this.categoryList.forEach((item, index) => {
            if (item.code === this.search.categoryCodes) {
              this.catogyActiveIndex = index
              this.search.categoryCodeName = item.name
            }
          })
          this.getListByCode(this.search.categoryCodes, 1)
        }
      })
    },
    // 根据经营类目查询规划师
    getListByCode(code, currentPage) {
      planner
        .findListByCode({
          categoryCodes: [code],
          categoryState: 1, // 分类层级
          limit: 10,
          start: this.pageOption.page || 1,
        })
        .then((res) => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          if (res) {
            this.loading = false
            this.finished = true
            this.error = false
            const { limit, currentPage = 1, totalCount = 0, records = [] } = res
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
              this.list = records
            } else {
              this.list = this.list.concat(currentPage)
            }
          }
        })
        .catch((error) => {
          console.log('error', error)
          this.loading = false
          this.finished = true
          this.error = true
        })
    },
    onLeftClick() {
      console.log('nav onClickLeft')
      this.uPGpBack()
    },
    handleRegionsSelect(data) {
      console.log('this.currentCity.code', this.currentCity.code)
      console.log('data[0]', data[0])
      if (this.currentCity.code !== data[0].code) return
      const { code, name } = data[1] || {}
      this.search.region = {
        code,
        name: name === '不限' ? '区域' : name,
      }
      this.isChooseCategory = false
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
      this.isChooseCategory = false
      this.handleSearch()
    },
    onLoad(isInit) {
      if (isInit && this.$route.query.categoryCode) {
        return
      }
      let currentPage = this.pageOption.page
      if (!this.refreshing && this.list.length && currentPage >= 1) {
        currentPage += 1
      } else if (this.refreshing) {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }
      if (this.catogyActiveIndex === 0) {
        this.getList(currentPage)
          .then((data) => {
            console.log(data)
            this.loading = false
            if (this.list.length >= this.pageOption.totalCount) {
              this.finished = true
            }
          })
          .catch(() => {
            this.error = true
            this.loading = false
          })
      } else {
        this.getListByCode(this.search.categoryCodes, currentPage)
      }
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.error = false
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
          this.uPIM(data)
          break
        case 'tel':
          console.log('想打电话：', data)
          if (this.isInApp) {
            this.$appFn.dggBindHiddenPhone(
              { plannerId: data.mchUserId },
              (res) => {
                const { code } = res || {}
                if (code !== 200) {
                  this.$xToast.show({
                    message: '拨号失败！',
                    duration: 1000,
                    forbidClick: true,
                    icon: 'toast_ic_remind',
                  })
                }
              }
            )
          } else {
            this.uPCall(data)
          }
          break
        case 'detail':
          // if (this.isApplets) {
          //   this.uni.navigateTo({
          //     url:
          //       '/pages/common_son/webview/index?mchUserId=' +
          //       data.mchUserId +
          //       '&url=planner/detail/&isShare=' +
          //       data.isShare,
          //   })
          //   return
          // }
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
    uPGetCurrentRegion({ type }) {
      return new Promise((resolve, reject) => {
        const { code } = this.currentCity || {}
        // 因为 app中每次关闭webview的cookie是未清除的，导致app原生中切换城市，未同步到cookie,
        // 所以 在app中每次打开页面需要调用方法获取一次，设置到页面里
        if (code && (type !== 'init' || !this.isInApp)) {
          resolve({ code })
          return
        }
        // app 上获取区域code
        if (this.isInApp) {
          this.$appFn.dggCityCode((res) => {
            console.log('dggCityCode:', res)
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
            this.SET_CITY({ code: adCode, name: cityName }) // 设置当前的定位到vuex中
            resolve({ code: adCode })
          })
        }
      })
    },

    // 拨打电话号码
    uPCall(data) {
      const ciphertext = data || {}
      const telNumber = ciphertext.phone
      if (ciphertext.status === 1) {
        if (this.isInApp) {
          this.$appFn.dgg_bindHiddenPhone(
            { plannerId: ciphertext.mchUserId },
            (res) => {
              const { code } = res || {}
              if (code !== 200) {
                this.$xToast.show({
                  message: '拨号失败！',
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
              }
            }
          )
          return
        }
        callPhone(telNumber)
      } else if (ciphertext.status === 0) {
        Toast({
          message: '当前人员已禁用，无法拨打电话',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      } else if (ciphertext.status === 3) {
        Toast({
          message: '当前人员已离职，无法拨打电话',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
      console.log('telNumber:', telNumber)
      // 如果当前页面在app中，则调用原生拨打电话的方法
      // 浏览器中调用的
    },

    // 发起聊天
    async uPIM(data = {}) {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      const { mchUserId, userName, type } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          await this.getUserInfo()
          this.$appFn.dggOpenIM(
            {
              name: userName,
              userId: mchUserId,
              userType: type,
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
      } else {
        const imUserType = type || 'MERCHANT_B' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        this.creatImSessionMixin({
          imUserId: mchUserId,
          imUserType,
        })
        // }
      }
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
                  this.setUserInfo(loginRes.data)
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
            this.setUserInfo(data)
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
      console.log('regionDto', regionDto)
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
    async getRegionList(codes) {
      const cityCode = this.isApplets ? this.code : codes
      try {
        const data = await dict.findCmsTier(
          { axios: this.$axios },
          { code: cityCode }
        )
        console.log(data)
        if (Array.isArray(data) && data.length) {
          const { code: currentCityCode } = this.currentCity || {}
          this.regionsOption = [
            {
              name: '区域',
              code: currentCityCode,
              children: Array.isArray(data) ? data : [],
            },
          ]
          if (this.$route.query.regionCode) {
            const data1 = data.filter((item) => {
              return item.code === this.$route.query.regionCode
            })
            this.backData = [
              {
                name: this.$route.query.cityName,
                code: this.$route.query.cityCode,
              },
              data1[0],
            ]
            this.search.region.name = data1[0].name
          }
        }
        return data
      } catch (error) {
        console.error('getRegionList:', error)
        return Promise.reject(error)
      }
    },
  },
  head() {
    return {
      title: '在线直选规划师',
      meta: [
        {
          name: 'spptmd-track_code',
          content: this.isInApp ? 'SPP000018' : 'SPW000019',
        },
      ],
    }
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
      ::v-deep.sticky-dropdown {
        .sp-sticky {
          padding-top: 0;
        }
      }
      ::v-deep.sp-dropdown-menu {
        position: relative;
        &__bar {
          padding: 0 40px;
          box-shadow: none;
          height: 90px;
          position: relative;
          &::after {
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            bottom: 0;
            right: -50%;
            left: -50%;
            height: 1px;
            background-color: #f4f4f4;
            transform: scale(0.5);
            z-index: 1;
          }
        }
        &__item {
          flex-basis: auto;
          flex-grow: initial;
          flex-shrink: 1;
          padding: 0 20px;
          justify-content: flex-start;
          &:first-child {
            flex-shrink: 0;
          }
          &:last-child {
            margin-left: 66px;
          }
        }
        &__title {
          color: #222222;
          line-height: 28px;
          &--active {
            color: @main-color;
          }
          .sp-ellipsis {
            padding: 8px 0;
            font-size: 26px;
            font-weight: 400;
          }
        }
        // 选中的样式
        .sp-dropdown-menu__title--selected {
          color: @main-color;
          .sp-ellipsis {
            font-weight: bold;
            font-size: 26px;
          }
          &::after {
            border-color: transparent transparent @main-color @main-color;
          }
        }
      }
    }
    .list-refresh {
      min-height: calc(100% - 218px);
    }
    .list-cell {
      padding: 40px;
    }
    /deep/ .search__dropdown-category {
      .sp-dropdown-item .sp-popup {
        max-height: 4rem;
        min-height: 2rem;
      }
    }
    .category-list {
      width: 100%;
      padding: 20px;
      clear: both;
      overflow: hidden;
      .item {
        font-size: 28px;
        color: #222;
        background: #f8f8f8;
        float: left;
        margin: 10px 12px;
        padding: 12px 20px;
        border-radius: 2px;
      }
      .active-item {
        color: #5883e8;
        background: #eef0ff;
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
      height: 340px;
      margin-top: 176px;
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
