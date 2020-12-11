<template>
  <div class="serveGoods">
    <sp-dropdown-menu ref="dropDownMenu">
      <sp-dropdown-item
        ref="item"
        :title-class="moreTextCss[0]"
        :title="dropdownTitle1"
        @open="open(0)"
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
        v-model="selectValue"
        :title="dropdownTitle2"
        :title-class="moreTextCss[1]"
        :options="option"
        @open="open(1)"
        @change="selectDropdown"
        @close="close(1)"
      />
    </sp-dropdown-menu>
    <install-app v-show="listShow" ref="installApp" />
    <sp-list
      v-show="listShow"
      v-model="loading"
      :finished="finished"
      :style="{
        maxHeight: maxHeight,
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
      />
    </sp-list>
    <Subscribe v-show="!listShow" />
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
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
    ServiceSelect,
    BottomConfirm,
    InstallApp,
    Subscribe,
  },
  mixins: [searchList],
  props: {
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
  },
  data() {
    return {
      formData: {
        start: 2,
        limit: 10,
        needTypes: 0,
        sortBy: '',
        classCodes: '',
        keywords: '',
      },
      listShow: true,
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
  watch: {
    searchText(val) {
      this.formData.keywords = val
      this.initGoodsList()
    },
    initServiceData(val) {
      // 商品列表
      this.serveGoodsListData = clone(val.goods.records)
      // 排序筛选
      val.sortFilter.forEach((item) => {
        this.option.push({
          text: item.name,
          value: item.code,
        })
      })
      // 分类数据
      this.typeData = clone(val.typeData)
    },
    activeData(val) {
      if (val.length) {
        this.addClass('active', 0)
      } else {
        this.removeClass('active', 0)
      }
      this.concatStr(val)
    },
  },
  mounted() {
    const installAPPHeight = this.$refs.installApp.$el.clientHeight
    const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
    const topHeight = this.$el.getBoundingClientRect().top
    this.maxHeight =
      document.body.clientHeight -
      installAPPHeight -
      dropDownMenuHeight -
      topHeight +
      'px'
    this.reqType = 'serve'
    this.$emit('goodsList', 'serve', this)
  },
  methods: {
    selectDropdown(val) {
      const option = this.option.filter((item) => {
        return item.value === val
      })
      this.dropdownTitle2 = option.text
      this.formData.sortBy = val
      this.initGoodsList()
    },
    handleSelect(val) {
      // 分类选择
      console.log(val)
      this.activeData = val
    },
    open(index) {},
    close(index) {
      // 关闭下拉选择框
      if (index === 1 && this.selectValue !== 0) {
        // 给下拉标题增加选中
        this.addClass('active', 1)
      } else {
        this.removeClass('active', 1)
      }
      if (index === 0) {
        this.activeData = clone(this.saveActiveData)
      }
    },
    onLoad() {
      console.log(1)
      // const arr = new Array(10).fill(2)
      // this.serveGoodsListData = [...this.serveGoodsListData, ...arr]
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
        strCode = ''
      } else if (
        this.saveActiveData[1].services[0].code === -1 &&
        this.saveActiveData[0].code === -1
      ) {
        // 父选项和子选择项都为不限
        strCode = ''
      } else if (this.saveActiveData[1].services[0].code === -1) {
        strCode = this.saveActiveData[0].code
      } else {
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
          this.dropdownTitle1 = '不限'
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
    resetAllSelect() {},
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
