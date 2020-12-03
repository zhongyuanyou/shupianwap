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
        <ServiceSelect :active-data="activeData" @select="handleSelect" />
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
      <goods-item v-for="(item, index) in listData" :key="index" />
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
  props: {
    initListData: {
      // 初始化列表数据，仅做初始化的时候用或是在进行条件搜索的时候用
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      selectValue: 0,
      dropdownTitle1: '全部服务',
      dropdownTitle2: '默认排序',
      moreTextCss: ['dropdownItem', 'dropdownItem'],
      maxHeight: 0,
      listData: [],
      activeData: [
        { text: '工商服务', id: '1' },
        {
          services: [
            {
              text: '有限公司注册',
              id: 1,
            },
            {
              text: '外资公司注册',
              id: 2,
              disabled: true,
            },
          ],
        },
      ],
      option: [
        { text: '默认排序', value: 0 },
        { text: '销量从高到低', value: 1 },
        { text: '销量从低到高', value: 2 },
        { text: '价格从高到低', value: 3 },
        { text: '价格从低到高', value: 4 },
      ],
      saveActiveData: [],
    }
  },
  watch: {
    selectValue(val) {
      this.dropdownTitle2 = this.option[val].text
    },
    activeData(val) {
      console.log('12313')
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
    this.listData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  methods: {
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
      const arr = new Array(10).fill(2)
      this.listData = [...this.listData, ...arr]
      this.loading = false
    },
    resetFilters() {
      // 重置分类筛选
      this.activeData = []
    },
    confirmFilters() {
      // 确认筛选
      console.log('this.activeData', this.activeData)
      this.saveActiveData = clone(this.activeData)
      this.$refs.item.toggle()
    },
    concatStr(val) {
      // 处理筛选头部的展示
      console.log('sad', val)
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
