<template>
  <div class="serveGoods">
    <sp-dropdown-menu ref="dropDownMenu">
      <sp-dropdown-item
        v-model="value1"
        title-class="dropdownItem"
        :title="dropdownTitle1"
        @open="open(0)"
      >
        <ServiceSelect :active-data="activeData" @select="handleSelect" />
        <BottomConfirm />
      </sp-dropdown-item>
      <sp-dropdown-item
        v-model="value2"
        :title="dropdownTitle2"
        title-class="dropdownItem"
        :options="option"
        @open="open(1)"
      />
    </sp-dropdown-menu>
    <install-app ref="installApp" />
    <sp-list
      v-model="loading"
      :finished="finished"
      :style="{
        maxHeight: maxHeight,
      }"
      finished-text="没有更多了"
      class="goods-content"
      @load="onLoad"
    ></sp-list>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
import InstallApp from '@/components/common/app/InstallApp'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
export default {
  name: 'ServeGoods',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    ServiceSelect,
    BottomConfirm,
    InstallApp,
  },
  data() {
    return {
      loading: false,
      finished: false,
      value1: 0,
      value2: 0,
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
    }
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
    /* this.dropDownDom = [].slice.apply(
      null,
      document.querySelectorAll('.dropdownItem')
    ) */
    this.$nextTick(() => {
      this.dropDownDom = [].slice.call(
        document.querySelectorAll('.dropdownItem')
      )
    })
    // console.log(document.body.clientHeight - 40 - 44 - 44 - 64)
    // console.log(this.maxHeight)
  },
  methods: {
    handleSelect(val) {
      console.log(val)
    },
    open(e) {
      console.log(e)
    },
    close(e) {
      console.log(123)
      console.log(e)
    },
    onLoad() {
      console.log(1)
    },
    handlerItemChange(action, index) {
      console.log(action, index)
      // this.$toast(`选择结果：${JSON.stringify({ type: action, index })}`);
    },
  },
}
</script>

<style lang="less" scoped>
.serveGoods {
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
    padding: 28px 40px;
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
}
</style>
