<template>
  <div class="select-phone">
    <div class="top">
      <sp-top-nav-bar
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </template>
        <template #title>
          <sp-nav-search
            v-model="search.searchKey"
            border
            placeholder="请输入您喜欢的号码"
            class="search"
          >
            <template #left-icon>
              <my-icon
                name="sear_ic_sear"
                size="0.4rem"
                color="#999999"
              ></my-icon>
            </template>
          </sp-nav-search>
        </template>
        <template #right> 搜索 </template>
      </sp-top-nav-bar>
    </div>
    <div class="dropdown-list">
      <sp-sticky>
        <sp-dropdown-menu>
          <!-- 选择价格区间 -->
          <sp-dropdown-item
            ref="isShowPrice"
            :title-class="dropdownPriceTitle != '价格' ? 'title-style' : ''"
            :title="dropdownPriceTitle"
          >
            <div class="select-price">
              <PriceFilterComponents
                ref="PriceFilter"
                :price-list="formatPriceOption"
                @minInput="minInput"
                @maxInput="maxInput"
                @selectItems="selectedPrices"
                @selectAllItems="selectedAllPrices"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetPrice"
              @confirmFilters="confirmPrice"
            />
          </sp-dropdown-item>
          <!-- 排序 -->
          <sp-dropdown-item
            v-model="search.sortValue"
            :title-class="
              formatSortOption[0] &&
              formatSortOption[0].value !== search.sortValue
                ? 'title-style'
                : ''
            "
            :options="formatSortOption"
            :disabled="!formatSortOption || !formatSortOption.length"
            @change="handleSortChange"
          />
        </sp-dropdown-menu>
      </sp-sticky>
    </div>
    <div class="result-List">
      <!-- 搜索结果列表 -->
      <sp-pull-refresh
        v-model="refreshing"
        success-text="刷新成功"
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
          <CheckboxList :list="checkboxList" @operation="handleOperation" />
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  TopNavBar,
  NavSearch,
  Toast,
  Icon,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Sticky,
  PullRefresh,
  List,
} from '@chipspc/vant-dgg'
import PriceFilterComponents from '@/components/common/filters/PriceFilterComponents'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import CheckboxList from '@/components/detail/CheckboxList'

import { shoppingCar, dict } from '@/api'

const DEFAULT_PAGE = {
  limit: 10,
  page: 1,
  totalCount: 0,
}

export default {
  name: 'SelectPhone',
  layout: 'keepAlive',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    PriceFilterComponents,
    BottomConfirm,
    CheckboxList,
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
      loading: false,
      error: false,
      finished: false,
      refreshing: false,
      pageOption: DEFAULT_PAGE,
      priceOption: [],
      sortOption: [],
      checkboxList: [],
      redirect: this.$route.query.redirect, // 返回跳转的位置
      redirectType: this.$route.query.redirectType || 'wap', // 跳转的到 wap里面还是app里面去
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
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
        isAsc = !!ext2
      }
      return { searchKey, goodsPriceStart, goodsPriceEnd, orderBy, isAsc }
    },
  },
  watch: {
    formatSortOption: {
      handler(newVal, oldVal) {
        if (!this.search.sortValue) {
          this.search.sortValue = newVal[0] && newVal[0].value
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
    handleSortChange(value) {
      console.log(value)
      // 触发 formatSearchParams 计算
      this.search.sortValue = value
      this.handleSearch()
    },
    handleSearch() {
      this.refreshing = true
      this.onRefresh()
    },
    onLoad() {
      let currentPage = this.pageOption.page
      if (!this.refreshing && this.checkboxList.length && currentPage >= 1) {
        currentPage += 1
      } else if (this.refreshing) {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }

      this.getList(currentPage)
        .then((data) => {
          const { totalCount } = data
          this.loading = false
          if (this.pageOption.totalCount <= this.checkboxList.length) {
            this.finished = true
          }
        })
        .catch((error) => {
          this.error = true
          this.loading = false
          Toast('加载失败')
          console.log(error)
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onClickRight() {
      // 搜索
      this.handleSearch()
    },
    onClickLeft() {
      //  左侧返回
      this.uPGoBack()
    },
    minInput(val) {
      // 最小输入框
      console.log(val)
      this.search.price = {}
      this.search.minInput = val
    },
    maxInput(val) {
      // 最大输入框
      console.log(val)
      this.search.price = {}
      this.search.maxPrice = val
    },
    selectedAllPrices(item, items) {
      const { name, id } = item
      this.search.minInput = ''
      this.search.maxPrice = ''
      this.search.price = { name, id }
    },
    selectedPrices(item) {
      // 选择价格标题显示
      const { name, id } = item
      this.search.minInput = ''
      this.search.maxPrice = ''
      this.search.price = { name, id }
    },
    resetPrice() {
      // 重置价格
      this.dropdownPriceTitle = '价格'
      this.search.price = {}
      this.search.minInput = ''
      this.search.maxPrice = ''
      this.$refs.PriceFilter.clearInput()
    },
    confirmPrice() {
      // 确认价格
      this.$refs.isShowPrice.toggle()
      const { minInput, maxPrice, price } = this.search
      let dropdownPriceTitle = '价格'
      if (price.name) {
        dropdownPriceTitle = price.name
      } else if (minInput || maxPrice) {
        dropdownPriceTitle = minInput
          ? `${minInput}-${maxPrice}`
          : `${maxPrice}`
      }

      this.dropdownPriceTitle = dropdownPriceTitle
      this.handleSearch()
    },

    handleOperation(value) {
      const { type, data } = value || {}
      switch (type) {
        case 'confirm':
          this.uPGoBack(data)
      }
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
                Toast('返回失败！')
              }
            })
          }
        )
        return
      }

      // 在浏览器里 返回
      if (data) {
        // 判断是路劲还是name
        if (this.redirect) {
          const isPath = /\//.test(this.redirect + '')
          const pushParams = {
            path: isPath ? this.redirect : null,
            name: isPath ? null : this.redirect,
            params: { data },
          }
          this.$router.replace(pushParams)
        }
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
        const data = await shoppingCar.resourceList({
          classCode,
          limit,
          page: currentPage,
          searchKey,
          goodsPriceStart,
          goodsPriceEnd,
          orderBy,
          isAsc,
        })
        console.log(data)
        if (this.refreshing) {
          this.checkboxList = []
          this.refreshing = false
        }
        if (data) {
          if (!Array.isArray(data.records)) data.records = []
          const { limit, currentPage = 1, totalCount = 0, records = [] } = data
          this.pageOption = { limit, totalCount, page: currentPage }
          this.checkboxList.push(...records)
        }

        return data || {}
      } catch (error) {
        console.error('getList:', error)
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
        // console.log(data)
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
.select-phone {
  .top {
    padding: 16px 0 0 0;
    /deep/.iconfont {
      font-weight: 400;
    }
    /deep/.sp-top-nav-bar__title {
      // 搜索框样式
      margin: 0 144px 4px 104px;
      .search {
        width: 502px;
        .sp-field__control {
          font-size: 30px;
        }
      }
    }
    /deep/.sp-top-nav-bar__right {
      // 右边搜索样式
      font-size: 32px;
      color: #1a1a1a;
      padding: 0 42px;
    }
    /deep/.sp-top-nav-bar__left {
      // 左边返回样式
      padding: 0px 32px;
    }
    /deep/.sp-hairline--bottom::after {
      border-bottom-width: 0;
    }
  }
  .dropdown-list {
    // 下拉样式
    /deep/.sp-dropdown-menu__bar {
      .sp-dropdown-menu__item:last-child {
        padding-right: 40px;
      }
    }
  }
  /deep/.title-style {
    // 下拉选择显示标题样式
    font-size: 26px;
    font-weight: bold;
    color: #4974f5;
  }
  .select-phone {
    padding: 32px 40px;
  }
  .select-price {
    padding: 56px 40px 84px 40px;
  }
  .result-List {
    padding-bottom: 130px;
  }
}
</style>
