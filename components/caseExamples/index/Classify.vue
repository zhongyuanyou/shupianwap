<template>
  <!-- 分类 -->
  <div class="classify">
    <sp-dropdown-menu :lazy-render="false" active-color="#4974F5">
      <sp-dropdown-item ref="tab1" :title="tab1.title" @change="change($event)">
        <div>
          <div
            v-for="option of tab1.options"
            :key="option.value"
            class="dropdown_item"
            :class="{ activeOption: option.value == tab1.value }"
            @click="changeDropdownItem_1(option)"
          >
            <div>{{ option.text }}</div>
            <div>
              <my-icon
                v-if="option.value == tab1.value"
                name="tab_ic_check"
                color="#4974F5"
                size="0.28rem"
              />
            </div>
          </div>
        </div>
      </sp-dropdown-item>

      <!--v-model="tab2.value" :options="tab2.options" -->
      <sp-dropdown-item ref="tab2" :title="tab2.title">
        <TreeSelect
          :list="tab2.options"
          :value="tab2.value"
          @onChangeName="ServerSelectChangeName"
          @select="ServerSelect"
        ></TreeSelect>
      </sp-dropdown-item>
      <sp-dropdown-item ref="tab3" :title="tab3.title">
        <TreeSelect
          :list="tab3.options"
          :value="tab3.value"
          @onChangeName="areaChangeName"
          @select="AreaSelect"
        ></TreeSelect>
      </sp-dropdown-item>
    </sp-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'

import TreeSelect from './TreeSelect.vue'

import { goods, dict } from '@/api/index'

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
        value: 1,
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
            code: 'PRO_CLASS_TYPE_TRANSACTION',

            text: '交易商品',
            treelevel: 2,
            children: [
              {
                text: '不限',
                id: -1,
                code: -1,
              },
              {
                text: '公司交易',
                id: 'FL20201224136319',
                code: 'FL20201224136319',
                classCode: 'FL20201224136319',
                dictCode: 'CONDITION-JY-GS',
              },
              {
                text: '专利交易',
                id: 'FL20201224136341',
                code: 'FL20201224136341',
                classCode: 'FL20201224136341',
                dictCode: 'CONDITION-JY-ZY',
              },

              {
                text: '商标交易',
                id: 'FL20201224136273',
                code: 'FL20201224136273',
                classCode: 'FL20201224136273',
                dictCode: 'CONDITION-JY-SB',
              },
              {
                text: '资质交易',
                id: 'FL20201224136348',
                code: 'FL20201224136348',
                classCode: 'FL20201224136348',
                dictCode: 'CONDITION-JY-ZZ',
              },
            ],
          },
          {
            id: 2,
            treelevel: 3,
            code: 'PRO_CLASS_TYPE_SERVICE',
            text: '服务商品',
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
        text: '不限',
      })

      return list.map((item) => {
        item.text = item.text || item.name

        if (item.children) {
          item.children = this.setData(item.children)
        }
        return item
      })
    },

    getCity() {
      dict
        .findCmsTier(
          {},
          {
            code: '2147483647',
          }
        )
        .then((res) => {
          console.log(res)
          this.tab3.options = this.setData(res)
        })

      // goods
      //   .searchJyGoodsList(
      //     { axios: this.$axios },
      //     {
      //       start: 1,
      //       limit: 1,
      //       needTypes: 1,
      //       classCode: 'FL20201224136319',
      //       dictCode: 'CONDITION-JY-GS',
      //       searchKey: '',
      //       statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
      //       fieldList: [],
      //       platformPriceStart: '',
      //       platformPriceEnd: '',
      //     }
      //   )
      //   .then((data) => {
      //     if (
      //       data.filters &&
      //       data.filters.length > 0 &&
      //       data.filters[0].code === 'CONDITION-JY-GS-DQ'
      //     ) {
      //       this.tab3.options = this.setData(data.filters[0].children)
      //     }
      //   })

      // const arr = [
      //   // {
      //   //   text: '不限',
      //   //   text: '不限',
      //   //   id: -1,
      //   //   code: -1,
      //   // },
      //   {
      //     text: '公司交易',
      //     id: 'FL20201224136319',
      //     code: 'FL20201224136319',
      //     classCode: 'FL20201224136319',
      //     dictCode: 'CONDITION-JY-GS',
      //   },
      //   {
      //     text: '专利交易',
      //     id: 'FL20201224136341',
      //     code: 'FL20201224136341',
      //     classCode: 'FL20201224136341',
      //     dictCode: 'CONDITION-JY-ZY',
      //   },

      //   {
      //     text: '商标交易',
      //     id: 'FL20201224136273',
      //     code: 'FL20201224136273',
      //     classCode: 'FL20201224136273',
      //     dictCode: 'CONDITION-JY-SB',
      //   },
      //   {
      //     text: '资质交易',
      //     id: 'FL20201224136348',
      //     code: 'FL20201224136348',
      //     classCode: 'FL20201224136348',
      //     dictCode: 'CONDITION-JY-ZZ',
      //   },
      // ]

      // let area = []
      // arr.map((item) => {
      //   goods
      //     .searchJyGoodsList(
      //       { axios: this.$axios },
      //       {
      //         start: 1,
      //         limit: 1,
      //         needTypes: 1,
      //         classCode: item.classCode,
      //         dictCode: item.dictCode,
      //         searchKey: '',
      //         statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
      //         fieldList: [],
      //         platformPriceStart: '',
      //         platformPriceEnd: '',
      //       }
      //     )
      //     .then((data) => {
      //       if (item.dictCode === 'CONDITION-JY-GS') {
      //         if (
      //           data.filters &&
      //           data.filters.length > 0 &&
      //           data.filters[0].code === 'CONDITION-JY-GS-DQ'
      //         ) {
      //           area = data.filters[0].children
      //           this.tab3.options = this.setData(area)
      //         }
      //         if (
      //           data.filters &&
      //           data.filters.length > 0 &&
      //           data.filters[2].code === 'CONDITION-JY-GS-HY'
      //         ) {
      //           // 行业
      //           item.children = data.filters[2].children
      //         }
      //       } else if (item.dictCode === 'CONDITION-JY-ZY') {
      //         if (
      //           data.filters &&
      //           data.filters.length > 1 &&
      //           data.filters[1].code === 'CONDITION-JY-ZY-HY'
      //         ) {
      //           // 行业
      //           item.children = data.filters[1].children
      //         }
      //       } else if (item.dictCode === 'CONDITION-JY-SB') {
      //         if (
      //           data.filters &&
      //           data.filters.length > 0 &&
      //           data.filters[0].code === 'CONDITION-JY-SB-FL'
      //         ) {
      //           // 分类
      //           item.children = data.filters[0].children
      //         }
      //       } else if (item.dictCode === 'CONDITION-JY-ZZ') {
      //         if (
      //           data.filters &&
      //           data.filters.length > 0 &&
      //           data.filters[0].code === 'CONDITION-JY-ZZ-LB'
      //         ) {
      //           // 行业
      //           item.children = data.filters[0].children
      //         }
      //       }
      //       this.$set(this.tab2.options, 1, {
      //         id: 2,
      //         code: 'PRO_CLASS_TYPE_TRANSACTION',
      //         text: '交易商品',
      //         children: arr,
      //       })
      //     })
      // })
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
            const d = this.setData(data.typeData)
            d[0].children = [
              {
                id: -1,
                text: '不限',
              },
            ]

            this.tab2.options[1] = {
              id: 2,
              treelevel: 3,
              code: 'PRO_CLASS_TYPE_SERVICE',
              text: '服务商品',
              children: d,
            }
          }
        })
        .catch()
    },
    custom(item, option, index) {
      item.value = option.value
      item.title = option.text

      this.$refs.tabs[index].toggle()
      this.change()
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
    changeDropdownItem_1(option) {
      this.tab1.value = option.value
      this.$refs.tab1.toggle()
      this.change()
    },

    ServerSelectChangeName(name) {
      this.tab2.title = name || '分类'
    },
    areaChangeName(name) {
      this.tab3.title = name || '区域'
    },
    // 服务商品选择
    ServerSelect(item1, item2, item3) {
      console.log('ServerSelect', item1, item2, item3)

      this.tab2.value = [item1?.code, item2?.code, item3?.code]
      this.change()
      this.$refs.tab2.toggle()
    },

    AreaSelect(item1, item2, item3) {
      console.log('AreaSelect', item1, item2, item3)

      this.tab3.value = [item1?.code, item2?.code, item3?.code]

      this.change()
      this.$refs.tab3.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.classify {
  .dropdown_item {
    padding: 0 40px;
    height: 84px;
    line-height: 84px;
    background: #ffffff;

    display: flex;

    font-family: PingFangSC-Medium;

    font-size: 28px;
    color: #222222;
    letter-spacing: 0;
  }
  .dropdown_item.activeOption {
    color: #4974f5;
    font-weight: bold;
  }
  .dropdown_item > div:nth-child(1) {
    flex: 1;
  }
  .dropdown_item > div:nth-child(2) {
    width: 28px;
    height: 28px;
    padding: 0 40px;
  }

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
  ::v-deep .sp-dropdown-menu__title--active {
    font-weight: bold;
  }
}
</style>
