<template>
  <div class="serveGoods">
    <!-- S筛选项 -->
    <sp-dropdown-menu ref="dropDownMenu">
      <sp-dropdown-item
        ref="item"
        :title-class="moreTextCss[0]"
        :title="dropdownTitle1"
        @close="close(0)"
      >
        <ServiceSelect
          :active-data="activeData"
          :items="typeData"
          value="code"
          @select="handleSelect"
        />
        <BottomConfirm
          @resetFilters="resetFilters"
          @confirmFilters="confirmFilters"
        />
      </sp-dropdown-item>
      <sp-dropdown-item
        ref="dropdown2"
        :title="dropdownTitle2"
        :title-class="moreTextCss[1]"
      >
        <div class="sort-content">
          <sp-cell
            v-for="(item, index) in option"
            :key="index"
            :title="item.text"
            :class="{
              active: isActive(item),
            }"
            @click="selectCell(item)"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <my-icon
                v-show="isActive(item)"
                name="tab_ic_check"
                size="0.22rem"
                color="#4974f5"
              />
            </template>
          </sp-cell>
        </div>
      </sp-dropdown-item>
    </sp-dropdown-menu>
    <!-- E筛选项 -->
    <!-- S下载App -->
    <install-app v-show="listShow" ref="installApp" />
    <!-- E下载App -->
    <!--S商品列表-->
    <sp-list
      v-show="listShow"
      ref="splist"
      v-model="loading"
      :finished="finished"
      :style="{
        maxHeight: `${maxHeight}px`,
        paddingBottom: isShowOpenApp ? '45px' : '0',
      }"
      finished-text="没有更多了"
      class="goods-content"
      offset="30"
      @load="onLoad"
    >
      <goods-item
        v-for="(item, index) in serveGoodsListData"
        :key="index"
        :item-data="item"
        :search-key="formData.keywords"
      />
    </sp-list>
    <div>
      <sp-skeleton
        v-for="item in 10"
        :key="item"
        title
        :row="3"
        :loading="skeletonLoading"
        style="margin-top: 10px"
      ></sp-skeleton>
    </div>
    <!--E商品列表-->
    <!--S订阅-->
    <Subscribe
      v-show="!listShow && !skeletonLoading"
      :content="saveActiveData"
      :search-text="searchText"
    />
    <!--E订阅-->
    <openApp />
  </div>
</template>

<script>
import {
  DropdownMenu,
  DropdownItem,
  List,
  Skeleton,
  Cell,
} from '@chipspc/vant-dgg'
import InstallApp from '@/components/common/app/InstallApp'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import GoodsItem from '@/components/common/goodsItem/GoodsItem'
import Subscribe from '@/components/list/Subscribe'
import clone from '~/utils/clone'
import searchList from '@/mixins/searchList'

export default {
  name: 'ServeGoods',
  components: {
    GoodsItem,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    ServiceSelect,
    BottomConfirm,
    InstallApp,
    Subscribe,
  },
  mixins: [searchList],
  props: {
    reqType: {
      // 搜索结果页的顶部tab类型
      type: String,
      default() {
        return ''
      },
    },
    initServiceData: {
      // 初始化列表数据，仅做初始化的时候用或是在进行条件搜索的时候用
      type: Object,
      default() {
        return {}
      },
    },
    searchText: {
      // 搜索框内容
      type: String,
      default() {
        return ''
      },
    },
    sessionCategory: {
      // session分类数据，前置页面为分类页
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      formData: {
        start: 2,
        limit: 10,
        needTypes: 0,
        needGoodsList: 1,
        sortBy: '',
        classCodes: '',
        keywords: '',
      },
      skeletonLoading: true,
      listShow: false,
      loading: false,
      finished: false,
      selectValue: '',
      dropdownTitle1: '全部服务',
      dropdownTitle2: '默认排序',
      moreTextCss: ['dropdownItem', 'dropdownItem'],
      maxHeight: 0,
      serveGoodsListData: [],
      activeData: [],
      option: [],
      saveActiveData: [],
      typeData: [],
    }
  },
  computed: {
    cityCode() {
      const cityObj = this.$store.state.city.currentCity
      console.log('cityObj', cityObj)
      return cityObj
    },
    isShowOpenApp() {
      return this.$store.state.app.isShowOpenApp
    },
  },
  watch: {
    searchText(val) {
      this.formData.keywords = val
      if (this.reqType === 'serve') {
        this.initGoodsList()
      }
    },
    initServiceData(val) {
      // 排序筛选
      val.sortFilter.forEach((item) => {
        this.option.push({
          text: item.name,
          value: item.code,
        })
      })
      // 分类数据
      this.typeData = clone(val.typeData)
      // 初始化
      this.formData.sortBy = this.option[0].value
      this.initGoodsList()
    },
    activeData(val) {
      if (this.saveActiveData.length && this.saveActiveData[0].code !== -1) {
        this.addClass('active', 0)
      } else {
        this.removeClass('active', 0)
      }
      this.concatStr(val)
    },
  },
  mounted() {
    // 当前页面公共属性注册
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端搜索列表页', // 当前页面或服务名称
      current_url: location.href, // 发生地址
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    this.$emit('goodsList', 'serve', this)
    // 处理如果是从分类页进来的session中有分类数据
    if (this.sessionCategory && JSON.stringify(this.sessionCategory) !== '{}') {
      this.formData.classCodes = this.sessionCategory.code
    }
    this.formData.keywords = this.searchText
  },
  methods: {
    handleSelect(val) {
      // 分类选择
      // console.log(val)
      this.activeData = val
    },
    selectCell(item) {
      // 选择排序下拉框
      this.dropdownTitle2 = item.text
      this.formData.sortBy = item.value
      this.initGoodsList()
      this.$refs.dropdown2.toggle()
      if (item.value === this.option[0].value) {
        this.removeClass('active', 1)
      } else {
        this.addClass('active', 1)
      }
    },
    isActive(item) {
      // 排序选择激活状态
      return item.value === this.formData.sortBy
    },
    close(index) {
      if (index === 0) {
        this.activeData = clone(this.saveActiveData)
      }
    },
    onLoad() {
      this.searchKeydownHandle()
    },
    resetFilters() {
      // 重置分类筛选
      this.activeData = []
    },
    confirmFilters() {
      // 确认筛选
      console.log('this.activeData', this.activeData)
      this.saveActiveData = clone(this.activeData)
      this.formData.classCodes = this.typeDataHandle()
      this.initGoodsList()
      this.$refs.item.toggle()
    },
    typeDataHandle() {
      // 处理选择的分类数据
      let strCode
      if (this.saveActiveData.length === 0) {
        // 没有选项的数据
        strCode = ''
      } else if (
        this.saveActiveData[1].services[0].code === -1 &&
        this.saveActiveData[0].code === -1
      ) {
        // 父选项和子选择项都为不限
        strCode = ''
      } else if (this.saveActiveData[1].services[0].code === -1) {
        // 子选项为不限选项
        strCode = this.saveActiveData[0].code
      } else {
        // 子选项是非'不限'的选项
        strCode = []
        this.saveActiveData[1].services.forEach((item) => {
          strCode.push(item.code)
        })
        strCode = strCode.join(',')
      }
      return strCode
    },
    initGoodsList() {
      // 获取初始数据
      this.formData.start = 1
      this.serveGoodsListData = []
      this.loading = true
      this.finished = false
      this.searchKeydownHandle()
    },
    concatStr(val) {
      // 处理筛选头部的展示
      if (!val.length) {
        this.dropdownTitle1 = '全部服务'
        return
      }
      if (val[1] && val[1].services && val[1].services.length > 1) {
        this.dropdownTitle1 = '多选'
      } else if (
        val[1] &&
        val[1].services &&
        val[1].services.length === 1 &&
        val[1].services[0]
      ) {
        if (val[0].text === '不限') {
          this.dropdownTitle1 = '全部服务'
        } else {
          this.dropdownTitle1 = val[0].text + '-' + val[1].services[0].text
        }
      } else if (
        !val[1] ||
        !val[1].services ||
        !val[1].services.length ||
        (!val[1].services[0] && val[0])
      ) {
        this.dropdownTitle1 = val[0].text
      }
    },
    addClass(className, index) {
      this.moreTextCss[index].indexOf(className) === -1 &&
        // (this.moreTextCss[index] = this.moreTextCss[index] + ' ' + className)
        this.$set(
          this.moreTextCss,
          index,
          this.moreTextCss[index] + ' ' + className
        )
    },
    removeClass(className, index) {
      const arr = this.moreTextCss[index].split(' ')
      const _index = arr.findIndex((item) => item === className)
      if (_index !== -1) {
        arr.splice(_index, 1)
      }
      // this.moreTextCss[index] = arr.join(' ')
      this.$set(this.moreTextCss, index, arr.join(' '))
    },
    resetAllSelect() {
      this.saveActiveData = []
      this.activeData = []
      this.formData.sortBy = this.option[0].value
      this.formData.classCodes = ''
      this.formData.start = 1
      this.removeClass('active', 1)
      // this.selectValue = this.option[0].value
      this.dropdownTitle1 = '全部服务'
    },
    computedHeight() {
      // 计算列表的最大高
      const top = this.$refs.splist.$el.getBoundingClientRect().top
      console.log('top', top)
      this.maxHeight = document.body.clientHeight - top
      // console.log('this.$refs.splist', this.$refs.splist)
      // const installAPPHeight = this.$refs.installApp.$el.clientHeight
      // const installAPPTop = this.$refs.installApp.$el.getBoundingClientRect()
      //   .top
      // const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
      // const topHeight = this.$el.getBoundingClientRect().top
      // this.maxHeight =
      //   document.body.clientHeight - installAPPHeight - installAPPTop
    },
  },
}
</script>

<style lang="less" scoped>
.serveGoods {
  /deep/.dropdownItem {
    &.active {
      font-weight: bold;
      color: #4974f5;
    }
  }
  /deep/.sp-dropdown-item {
    z-index: 30 !important;
  }
  /*height: calc(100% - 200px);*/
  /deep/.sp-dropdown-item__content {
    max-height: 100%;
  }
  /deep/.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    padding: 0 40px;
  }
  /deep/.sp-dropdown-menu__item {
    margin-right: 80px;
    &:last-child {
      margin-right: 0;
    }
  }
  /*S排序选择框*/
  .sort-content {
    .sp-cell {
      &.active {
        font-weight: bold;
        color: #4974f5;
      }
    }
  }
  /*E排序选择框*/
  /deep/.sp-cell {
    padding: 18px 40px;
    &::after {
      display: none;
    }
    &:last-child {
      margin-bottom: 40px;
    }
  }
  /deep/.sp-dropdown-menu__title--active {
    font-weight: bold;
  }
  .goods-content {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /deep/.sp-tree-select {
    min-height: 600px;
    max-height: 600px;
    height: auto !important;
    .sp-tree-select__nav .sp-sidebar-item {
      padding: 30px 0 30px 40px;
    }
  }
  /deep/.fixed-half-opacity {
    border-bottom: 1px solid #cdcdcd;
  }
  /deep/.sp-dropdown-item__option--active {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  .subscribe {
    padding: 0 40px;
  }
}
</style>
