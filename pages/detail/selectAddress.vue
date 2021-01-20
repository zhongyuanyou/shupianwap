<template>
  <div class="select-address">
    <div
      class="head"
      :style="{
        'padding-top': headerPaddingTop,
      }"
    >
      <sp-top-nav-bar
        class="select-address__search"
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            size="0.4rem"
            color="#1A1A1A"
            name="nav_ic_back"
          />
        </template>
        <template #title>
          <sp-nav-search
            v-model="search.searchKey"
            border
            placeholder="请输入您想注册的地址"
            class="select-address__search-input"
          >
            <template #left-icon>
              <sp-icon
                class-prefix="spiconfont"
                size="0.3rem"
                color="#999999"
                name="sear_ic_sear"
              />
            </template>
          </sp-nav-search>
        </template>
        <template #right> 搜索 </template>
      </sp-top-nav-bar>
    </div>
    <div class="dropdown">
      <sp-sticky>
        <sp-dropdown-menu class="dropdown__menu sp-hairline--bottom">
          <!-- S 选择价格区间 -->
          <sp-dropdown-item
            ref="isShowPrice"
            :title-class="
              dropdownPriceTitle != '价格' ? 'dropdown__menu-bar--active' : ''
            "
            :title="dropdownPriceTitle"
          >
            <div class="dropdown__item-price">
              <PriceFilterComponents
                ref="PriceFilter"
                :price-list="formatPriceOption"
                @minInput="minInput"
                @maxInput="maxInput"
                @selectItems="selectedPrice"
                @selectAllItems="selectAllPrice"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetFilters"
              @confirmFilters="confirmFilters"
            />
          </sp-dropdown-item>
          <!-- E 选择价格区间 -->
          <!-- S 排序选择 -->
          <sp-dropdown-item
            ref="sortDropdown"
            :title-class="
              formatSortOption[0] &&
              formatSortOption[0].value !== search.sortValue
                ? 'dropdown__menu-bar--active'
                : ''
            "
            :disabled="!formatSortOption || !formatSortOption.length"
            :title="dropdownSortTitle"
          >
            <div class="dropdown__item-sort">
              <sp-cell
                v-for="(item, index) in formatSortOption"
                :key="index"
                :title="item.text"
                :class="{
                  active: item.value === search.sortValue,
                }"
                @click="handleSortChange(item, index)"
              >
                <template #right-icon>
                  <sp-icon
                    v-show="item.value === search.sortValue"
                    class-prefix="spiconfont"
                    name="tab_ic_check"
                    size="0.22rem"
                    color="#4974f5"
                  />
                </template>
              </sp-cell>
            </div>
          </sp-dropdown-item>
          <!-- E 排序选择 -->
        </sp-dropdown-menu>
      </sp-sticky>
    </div>
    <div class="select-address-list">
      <div class="select-address-list__container">
        <!-- 搜索结果列表 -->
        <sp-pull-refresh
          v-model="refreshing"
          success-text="刷新成功"
          class="select-address-list__refresh"
          @refresh="onRefresh"
        >
          <sp-list
            v-model="loading"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
            :error.sync="error"
            :finished="finished"
            @load="onLoad"
          >
            <template #default>
              <AddressList :list="addressList" @operation="handleOperation" />
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
    <div class="footer">
      <sp-button color="#4974F5" block @click="onSubmit"> 确认选择 </sp-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  TopNavBar,
  NavSearch,
  DropdownMenu,
  DropdownItem,
  Sticky,
  List,
  PullRefresh,
  Button,
  Cell,
  Icon,
} from '@chipspc/vant-dgg'
import PriceFilterComponents from '@/components/common/filters/PriceFilterComponents'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import AddressList from '@/components/detail/AddressList'
import LoadingDown from '@/components/common/loading/LoadingDown'

import { shoppingCar, dict } from '@/api'

const DEFAULT_PAGE = {
  limit: 10,
  page: 1,
  totalCount: 0,
}

export default {
  name: 'SelectAddress',
  layout: 'keepAlive',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    PriceFilterComponents,
    BottomConfirm,
    AddressList,
    LoadingDown,
  },
  data() {
    return {
      search: {
        searchKey: '',
        sortValue: 0,
        price: {},
        minPrice: '',
        maxPrice: '',
      },
      dropdownPriceTitle: '价格',
      dropdownSortTitle: '默认排序',
      loading: false,
      error: false,
      finished: false,
      refreshing: false,
      pageOption: DEFAULT_PAGE,
      priceOption: [],
      sortOption: [],
      addressList: [],
      selectedItem: null, // 选择的项
      redirect: this.$route.query.redirect, // 返回跳转的位置
      redirectType: this.$route.query.redirectType || 'wap', // 跳转的到 wap里面还是app里面去
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),

    formatSortOption() {
      if (!Array.isArray(this.sortOption)) return []
      return this.sortOption.map((item) => {
        const { name, code } = item || {}
        return { text: name, value: code }
      })
    },

    formatPriceOption() {
      if (!Array.isArray(this.priceOption)) return []
      return this.priceOption.map((item) => {
        const { name, code } = item || {}
        return { name, id: code }
      })
    },

    // 格式化查询条件
    formatSearchParams() {
      const { searchKey, minPrice, maxPrice, price, sortValue } = this.search
      let goodsPriceStart = null
      let goodsPriceEnd = null
      let orderBy = null
      let isAsc = false
      if (price.id) {
        const matchedPrice =
          this.priceOption.find((item) => item.code === price.id) || {}
        // notice: 价格 需要在cms 数据字典配置 扩展第二字段  如 ext2:‘1000-2000’
        const { ext1, ext2 } = matchedPrice
        goodsPriceStart = ext1 || null
        goodsPriceEnd = ext2 || null
      } else {
        goodsPriceStart = minPrice || null
        goodsPriceEnd = maxPrice || null
      }

      const matchedSort = this.sortOption.find(
        (item) => item.code === sortValue
      )
      if (matchedSort) {
        const { ext1, ext2 } = matchedSort
        orderBy = ext1
        isAsc = !!+ext2 // 字符串的 0 与 1 ，需要转换为 boolean
      }
      return { searchKey, goodsPriceStart, goodsPriceEnd, orderBy, isAsc }
    },
    headerPaddingTop() {
      if (this.appInfo && this.appInfo.statusBarHeight)
        return this.appInfo.statusBarHeight + 'px'
      else if (this.isInApp) {
        return '20px'
      } else {
        return ['constant(safe-area-inset-top)', 'env(safe-area-inset-top)']
      }
    },
  },
  watch: {
    formatSortOption: {
      handler(newVal, oldVal) {
        if (!this.search.sortValue) {
          this.search.sortValue = newVal[0] && newVal[0].value
          this.dropdownSortTitle = newVal[0] && newVal[0].text
        }
      },
      immediate: true,
    },
  },
  created() {
    if (process && process.client) {
      this.getFilterOption()
    }
  },
  methods: {
    handleSortChange(item) {
      const { value, text } = item || {}
      console.log(value)
      // 触发 formatSearchParams 计算
      this.dropdownSortTitle = text
      this.search.sortValue = value
      this.$refs.sortDropdown.toggle()
      this.handleSearch()
    },
    handleSearch() {
      this.refreshing = true
      this.onRefresh()
    },

    onLoad() {
      let currentPage = this.pageOption.page
      if (!this.refreshing && this.addressList.length && currentPage >= 1) {
        currentPage += 1
      } else if (this.refreshing) {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }

      this.getList(currentPage)
        .then((data) => {
          const { totalCount } = data
          this.loading = false
          if (this.pageOption.totalCount <= this.addressList.length) {
            this.finished = true
          }
        })
        .catch((error) => {
          this.error = true
          this.loading = false
          this.$xToast.show({
            message: '加载失败',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
          console.log(error)
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onClickLeft() {
      // 返回按钮
      this.uPGoBack()
    },
    onClickRight() {
      // 搜索按钮
      this.handleSearch()
    },
    minInput(val) {
      // 最小输入框
      console.log(val)
      this.search.price = {}
      let numberVal = +val
      if (!isNaN(numberVal)) {
        numberVal = numberVal * 100 // 元转为分
      }
      this.search.minPrice = numberVal
    },
    maxInput(val) {
      // 最大输入框
      console.log(val)
      this.search.price = {}
      let numberVal = +val
      if (!isNaN(numberVal)) {
        numberVal = numberVal * 100 // 元转为分
      }
      this.search.maxPrice = numberVal
    },
    selectAllPrice(item) {
      // 选择不限显示标题
      const { name, id } = item
      this.search.minPrice = ''
      this.search.maxPrice = ''
      this.search.price = { name, id }
    },
    selectedPrice(item) {
      // 修改选中价格区间标题显示
      const { name, id } = item
      this.search.minPrice = ''
      this.search.maxPrice = ''
      this.search.price = { name, id }
    },
    resetFilters() {
      // 重置价格
      this.dropdownPriceTitle = '价格'
      this.search.price = {}
      this.search.minPrice = ''
      this.search.maxPrice = ''
      this.$refs.PriceFilter.clearInput()
    },
    confirmFilters() {
      // 价格区间确认
      this.$refs.isShowPrice.toggle()
      const { price } = this.search
      let { minPrice, maxPrice } = this.search
      if (!isNaN(minPrice)) {
        minPrice = minPrice / 100
      }

      if (!isNaN(maxPrice)) {
        maxPrice = maxPrice / 100
      }

      let dropdownPriceTitle = '价格'
      if (price.name) {
        dropdownPriceTitle = price.name
      } else if (minPrice || maxPrice) {
        dropdownPriceTitle = minPrice
          ? `${minPrice}${maxPrice ? '-' + maxPrice : ''}`
          : `${maxPrice}`
      }

      this.dropdownPriceTitle = dropdownPriceTitle
      this.handleSearch()
    },
    handleOperation(value) {
      const { type, data } = value || {}
      switch (type) {
        case 'selected':
          this.selectedItem = data
          break
      }
    },

    onSubmit() {
      if (!this.selectedItem) {
        this.$xToast.show({
          message: '请选择',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      this.uPGoBack(this.selectedItem)
    },

    // 平台不同，跳转方式不同
    uPGoBack(data) {
      if (this.isInApp && this.redirectType === 'app') {
        const fullPath = location ? location.href : ''
        this.$appFn.dggWebBackValueToFlutter(
          {
            code: data ? 200 : 201,
            url: fullPath,
            data,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              console.error('dggWebBackValueToFlutter 失败')
              return
            }
            this.$appFn.dggCloseWebView((res) => {
              if (!res || res.code !== 200) {
                this.$xToast.show({
                  message: '返回失败',
                  duration: 1000,
                  icon: 'toast_ic_error',
                  forbidClick: true,
                })
              }
            })
          }
        )
        return
      }

      // 在浏览器里 返回
      if (this.redirect) {
        const isPath = /\//.test(this.redirect + '')
        const pushParams = {
          path: isPath ? this.redirect : null,
          name: isPath ? null : this.redirect,
          params: { data },
        }
        this.$router.replace(pushParams)
      } else {
        this.$router.back(-1)
      }
    },

    // 请求列表
    async getList(currentPage) {
      const { limit } = this.pageOption
      const {
        searchKey,
        goodsPriceStart,
        goodsPriceEnd,
        orderBy,
        isAsc,
      } = this.formatSearchParams
      try {
        const classCode = this.$route.query.classCode
        const areaCode = this.$route.query.areaCode
        if (!classCode) {
          return Promise.reject(new Error('缺少必要的参数classCode'))
        }

        const fieldList = areaCode
          ? [
              {
                fieldCode: 'area',
                matchType: 'MATCH_TYPE_MULTI',
                fieldValue: [areaCode],
              },
            ]
          : null

        const data = await shoppingCar.resourceList({
          classCode,
          limit,
          page: currentPage,
          searchKey,
          goodsPriceStart,
          goodsPriceEnd,
          orderBy,
          isAsc,
          withFieldFlg: 1, // 需要属性
          fieldList,
        })
        console.log(data)
        if (this.refreshing) {
          this.addressList = []
          this.refreshing = false
          this.selectedItem = null
        }
        if (data) {
          if (!Array.isArray(data.records)) data.records = []
          const { limit, currentPage = 1, totalCount = 0, records = [] } = data
          this.pageOption = { limit, totalCount, page: currentPage }
          this.addressList.push(...records)
        }

        return data || {}
      } catch (error) {
        console.error('getList:', error)
        if (this.refreshing) {
          this.refreshing = false
        }
        return Promise.reject(error)
      }
    },

    // 请求过滤条件
    async getFilterOption(currentPage) {
      try {
        const data = await dict.findCmsCodes(
          { axios: this.$axios },
          {
            codes: 'CRISPS-C-CONDITION-400-JG,CRISPS-C-CONDITION-400-PX',
          }
        )
        console.log(data)
        this.sortOption = data['CRISPS-C-CONDITION-400-PX']
        this.priceOption = data['CRISPS-C-CONDITION-400-JG']
        return data || {}
      } catch (error) {
        console.error('getFilterOption:', error)
        return Promise.reject(error)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.select-address {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  .head {
    background-color: #ffffff;
  }
  &__search {
    margin-top: 16px;
    &-input {
      /deep/.sp-field__control {
        font-size: 30px;
      }
    }
  }
  /deep/.sp-top-nav-bar {
    &__title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 144px 4px 104px;
    }
    &__right {
      font-size: 32px;
      color: #1a1a1a;
      padding: 0 42px;
    }
    &__left {
      padding: 0px 32px;
    }
    &::after {
      content: none;
    }
  }

  .dropdown {
    &__menu {
      &::after {
        border-color: #f4f4f4;
      }
      /deep/.dropdown__menu-bar--active {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4974f5;
        &::after {
          border-color: transparent transparent #4974f5 #4974f5;
        }
      }
      /deep/.sp-dropdown-menu {
        &__bar {
          box-shadow: 0 0.5px 0px #f4f4f4;
        }
      }
    }
    &__item-price {
      padding: 56px 40px 84px 40px;
    }
    &__item-sort {
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
  }

  &-list {
    flex: 1;
    position: relative;
    &__container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    &__refresh {
      min-height: 100%;
    }
  }
  .footer {
    padding: 10px 40px 24px;
  }
}
</style>
