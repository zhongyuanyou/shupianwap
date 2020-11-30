<template>
  <div class="serveGoods">
    <sp-dropdown-menu ref="dropDownMenu">
      <sp-dropdown-item
        ref="item"
        title-class="dropdownItem"
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
        title-class="dropdownItem"
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
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
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
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      selectValue: 0,
      dropdownTitle1: '全部服务',
      dropdownTitle2: '默认排序',
      maxHeight: 0,
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
      dropDownDom: null,
      currentSelectActiveData: null,
      currentDropDownDom: null, // 当前触发的下拉框dom
    }
  },
  watch: {
    selectValue(val) {
      this.dropdownTitle2 = this.option[val].text
    },
    activeData(val) {
      if (val.length === 0) {
        this.dropDownDom[0].classList.remove('active')
      }
    },
  },
  mounted() {
    // console.log(this.$el.getBoundingClientRect())
    const installAPPHeight = this.$refs.installApp.$el.clientHeight
    const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
    const topHeight = this.$el.getBoundingClientRect().top
    this.maxHeight =
      document.body.clientHeight -
      installAPPHeight -
      dropDownMenuHeight -
      topHeight +
      'px'
    this.$nextTick(() => {
      this.dropDownDom = [].slice.call(
        document.querySelectorAll('.dropdownItem')
      )
    })
  },
  methods: {
    handleSelect(val) {
      // 分类选择
      console.log(val)
      this.activeData = val
      // this.currentSelectActiveData = val
    },
    open(index) {
      // 打开下拉选择框
      console.log('open', index)
      if (index === 0) {
        this.currentSelectActiveData = this.activeData
      }
    },
    close(index) {
      console.log(123)
      // 关闭下拉选择框
      if (index === 1 && this.selectValue !== 0) {
        // 给下拉标题增加选中
        this.dropDownDom[1].classList.add('active')
      } else {
        this.dropDownDom[1].classList.remove('active')
      }
      if (index === 0) {
        this.activeData = this.currentSelectActiveData
        this.currentSelectActiveData = null
        if (this.activeData.length) {
          this.dropDownDom[0].classList.add('active')
        } else {
          this.dropDownDom[0].classList.remove('active')
        }
      }
    },
    onLoad() {
      console.log(1)
    },
    resetFilters() {
      // 重置分类筛选
      this.activeData = []
    },
    confirmFilters() {
      // 确认筛选
      console.log('this.activeData', this.activeData)
      if (this.activeData && this.activeData.length) {
        this.currentSelectActiveData = this.activeData
        this.concatStr(this.activeData)
      } else {
        this.dropdownTitle1 = '全部服务'
      }
      this.$refs.item.toggle()
    },
    concatStr(val) {
      /* let str = ''
      str = val[0].text
      if (val[1] && val[1].services && val[1].services.length) {
        val[1].services.forEach((item) => {
          str += ','
          str += item.text
        })
      } */
      if (val[1] && val[1].services && val[1].services.length > 1) {
        this.dropdownTitle1 = '多选'
      } else if (val[1] && val[1].services && val[1].services.length === 1) {
        this.dropdownTitle1 = val[1].services[0].text
      }
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
