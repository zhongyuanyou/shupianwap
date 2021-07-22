<template>
  <!-- 分类 -->
  <div class="classify">
    <sp-dropdown-menu active-color="#4974F5">
      <sp-dropdown-item
        v-model="tab1.value"
        :title="tab1.title"
        :options="tab1.options"
        @change="change($event)"
      />

      <!--v-model="tab2.value" :options="tab2.options" -->
      <sp-dropdown-item ref="tab2" :title="tab2.title">
        <TreeSelect
          :list="tab2.options"
          :value="tab2.value"
          @select="ServerSelect"
        ></TreeSelect>
      </sp-dropdown-item>
      <sp-dropdown-item ref="tab3" :title="tab3.title">
        <TreeSelect :list="tab3.options" @select="AreaSelect"></TreeSelect>
      </sp-dropdown-item>
    </sp-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'

import TreeSelect from './TreeSelect.vue'

import { goods } from '@/api/index'

export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    TreeSelect,
  },
  props: {
    search: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      tab1: {
        title: '默认排序',
        value: '',
        options: [
          { text: '默认排序', value: 1 },
          { text: '评分由高到低', value: 2 },
        ],
      },
      tab2: {
        title: '分类',
        value: [],
        options: [
          {
            id: 1,
            code: 'PRO_CLASS_TYPE_SERVICE',
            name: '服务商品',
            text: '服务商品',
            children: [],
          },
          {
            id: 2,
            code: 'PRO_CLASS_TYPE_TRANSACTION',
            name: '交易商品',
            text: '交易商品',
            children: [],
          },
        ],
      },
      tab3: {
        title: '区域',
        value: [],
        options: [],
      },

      tabs: [
        {
          title: '区域',
          value: '',
          options: [
            { text: ' 全部类型', value: '' },
            { text: '服务订单', value: '1' },
            { text: '资源订单', value: '2' },
          ],
        },
      ],
    }
  },
  watch: {
    search: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.tab2.value = [
          newValue.productTypeCode,
          newValue.productOneBelongCode,
          newValue.productTwoBelongCode,
        ]
        console.log('watch search', newValue, this.tab2.value)
      },
    },
  },
  mounted() {
    this.getSearchServeGoodsList()
    this.getCity()
  },
  methods: {
    setData(list) {
      list.unshift({
        id: -1,
        name: '不限',
        text: '不限',
      })

      return list.map((item) => {
        item.text = item.name

        if (item.children) {
          item.children = this.setData(item.children)
        }
        return item
      })
    },

    getCity() {
      const arr = [
        {
          name: '公司交易',
          id: 'FL20201224136319',
          code: 'FL20201224136319',
          classCode: 'FL20201224136319',
          dictCode: 'CONDITION-JY-GS',
        },
        {
          name: '专利交易',
          id: 'FL20201224136341',
          code: 'FL20201224136341',
          classCode: 'FL20201224136341',
          dictCode: 'CONDITION-JY-ZY',
        },

        {
          name: '商标交易',
          id: 'FL20201224136273',
          code: 'FL20201224136273',
          classCode: 'FL20201224136273',
          dictCode: 'CONDITION-JY-SB',
        },
        {
          name: '资质交易',
          id: 'FL20201224136348',
          code: 'FL20201224136348',
          classCode: 'FL20201224136348',
          dictCode: 'CONDITION-JY-ZZ',
        },
      ]
      let area = []

      arr.map((item) => {
        goods
          .searchJyGoodsList(
            { axios: this.$axios },
            {
              start: 1,
              limit: 1,
              needTypes: 1,
              classCode: item.classCode,
              dictCode: item.dictCode,
              searchKey: '',
              statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
              fieldList: [],
              platformPriceStart: '',
              platformPriceEnd: '',
            }
          )
          .then((data) => {
            if (item.dictCode === 'CONDITION-JY-GS') {
              if (
                data.filters &&
                data.filters.length > 0 &&
                data.filters[0].code === 'CONDITION-JY-GS-DQ'
              ) {
                area = data.filters[0].children
                this.tab3.options = this.setData(area)
              }
              if (
                data.filters &&
                data.filters.length > 0 &&
                data.filters[2].code === 'CONDITION-JY-GS-HY'
              ) {
                // 行业
                item.children = data.filters[2].children
              }
            } else if (item.dictCode === 'CONDITION-JY-ZY') {
              if (
                data.filters &&
                data.filters.length > 1 &&
                data.filters[1].code === 'CONDITION-JY-ZY-HY'
              ) {
                // 行业
                item.children = data.filters[1].children
              }
            } else if (item.dictCode === 'CONDITION-JY-SB') {
              if (
                data.filters &&
                data.filters.length > 0 &&
                data.filters[0].code === 'CONDITION-JY-SB-FL'
              ) {
                // 分类
                item.children = data.filters[0].children
              }
            } else if (item.dictCode === 'CONDITION-JY-ZZ') {
              if (
                data.filters &&
                data.filters.length > 0 &&
                data.filters[0].code === 'CONDITION-JY-ZZ-LB'
              ) {
                // 行业
                item.children = data.filters[0].children
              }
            }
            this.$set(this.tab2.options, 1, {
              id: 2,
              code: 'PRO_CLASS_TYPE_TRANSACTION',
              name: '交易商品',
              text: '交易商品',
              children: arr,
            })

            // this.tab2.options[1] = {
            //   id: 2,
            //   code: 'PRO_CLASS_TYPE_TRANSACTION',
            //   name: '交易商品',
            //   text: '交易商品',
            //   children: arr,
            // }

            // this.$forceUpdate()
          })
      })
    },
    getSearchServeGoodsList() {
      goods
        .searchServeGoodsList(
          { axios: this.$axios },
          {
            start: 1,
            limit: 10,
            needTypes: 1,
            needGoodsList: 0,
            searchText: '',
          }
        )
        .then((data) => {
          if (data && data.typeData && data.typeData.length > 0) {
            this.tab2.options[0] = {
              id: 1,
              code: 'PRO_CLASS_TYPE_SERVICE',
              name: '服务商品',
              text: '服务商品',
              children: data.typeData,
            }
          }
        })
        .catch()
    },
    custom(item, option, index) {
      item.value = option.value
      item.title = option.text
      // console.log(item, option, index)
      this.$refs.tabs[index].toggle()
      this.$emit('select', this.tab1, this.tabs)
    },

    change() {
      this.$emit('select', this.tab1, this.tab2, this.tab3)
      if (this.tab1.value) {
        const item = this.tab1.options.find((item) => {
          return item.value === this.tab1.value
        })
        if (item && item.text) {
          this.tab1.title = item.text
        }
      }
    },

    // 服务商品选择
    ServerSelect(item1, item2, item3) {
      console.log('ServerSelect', item1, item2, item3)
      this.tab2.title = '分类'
      const arr = [item1, item2, item3]
      arr.map((item) => {
        if (item?.code && item?.code !== -1) {
          this.tab2.title = item.name || '分类'
        }
      })

      this.tab2.value = [item1?.code, item2?.code, item3?.code]
      this.change()
      this.$refs.tab2.toggle()
    },
    AreaSelect(item1, item2, item3) {
      console.log('AreaSelect', item1, item2, item3)
      // this.tab3.title = item3.text || item2.text || item1.text || '区域'
      this.tab3.title = '区域'
      const arr = [item1, item2, item3]
      arr.map((item) => {
        if (item?.code) {
          this.tab3.title = item.text || '区域'
        }
      })
      this.tab3.value = [item1?.code, item2?.code, item3?.code]

      this.change()
      this.$refs.tab3.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.classify {
  .custom {
    // padding: 56px 40px 56px;
    padding: 56px 40px 32px;
    overflow: hidden;
    font-size: 0px;
    line-height: 0px;
    border-top: 1px solid #f5f5f5;

    .custom-container {
      margin: 0 -12px;
      & > div {
        display: inline-block;
        min-width: 140px;
        // min-width: 20%;
        text-align: center;
        background: #f8f8f8;
        border-radius: 4px;
        word-break: normal;
        white-space: nowrap;

        padding: 20px 12px;
        margin: 0 12px 24px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        line-height: 24px;
        color: #222222;
      }
      .active {
        background: #f2f5ff;
        color: #4974f5;
      }
    }
  }
  ::v-deep .sp-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  ::v-deep .sp-cell::after {
    border: 0;
  }
  ::v-deep .sp-dropdown-menu__bar {
    box-shadow: none;
  }
  ::v-deep .sp-dropdown-menu__title {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #222222;
    letter-spacing: 0;
    text-align: center;
  }
  ::v-deep .sp-dropdown-menu__title::after {
    right: -12px;
  }
  ::v-deep .sp-dropdown-item__option {
    font-family: PingFangSC-Regular;
    font-size: 28px;

    letter-spacing: 0;
    color: #222222;
  }
  ::v-deep .sp-dropdown-item__option--active {
    font-weight: bold;
  }
}
</style>
