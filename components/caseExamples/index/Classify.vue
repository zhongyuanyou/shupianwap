<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <sp-dropdown-item
      v-model="tab1.value"
      :title="tab1.title"
      :options="tab1.options"
      @change="change($event)"
    />

    <!--v-model="tab2.value" :options="tab2.options" -->
    <sp-dropdown-item ref="tab2" :title="tab2.title" @change="change($event)">
      <TreeSelect
        :list="tab2.options"
        :level="3"
        @select="ServerSelect"
      ></TreeSelect>

      <!-- <ServerContainer :items="tab2.options" :level="3" @select="ServerSelect">
        <template v-slot:children="props">
          <Server :items="props.children" :level="3"></Server>
        </template>
      </ServerContainer> -->

      <!-- <sp-tree-select
        height="55vw"
        :items="serveGoodsType"
        :main-active-index.sync="mainActiveIndex"
        :active-index.sync="activeIndex1"
        @click-nav="clickNav1"
      >
        <template #content>
          <sp-tree-select
            height="55vw"
            :items="serveGoodsType2"
            :main-active-index.sync="activeIndex1"
            :active-index.sync="activeIndex2"
          >
          </sp-tree-select>
        </template>
      </sp-tree-select> -->
    </sp-dropdown-item>

    <!-- 国际分类 -->
    <sp-dropdown-item
      v-for="(item, index) of tabs"
      ref="tabs"
      :key="index"
      v-model="item.value"
      :title="item.title"
    >
      <template>
        <div class="custom">
          <div class="custom-container">
            <div
              v-for="option in item.options"
              :key="option.id"
              :class="option.value === item.value ? 'active' : ''"
              @click="custom(item, option, index)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </template>
    </sp-dropdown-item>
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'

import ServerContainer from './ServerContainer.vue'
import Server from './Server.vue'

import TreeSelect from './TreeSelect.vue'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect1.vue'

import { goods } from '@/api/index'

export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    TreeSelect,
    // ServiceSelect,
    // Server,
    // ServerContainer,
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
        value: '',
        options: [
          // { text: '交易商品', value: 1 },
          // { text: '服务商品', value: 2 },
        ],
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
  mounted() {
    this.getSearchServeGoodsList()
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

    getCity() {},
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
            this.tab2.options = [
              {
                id: 1,
                code: 1,
                name: '服务商品',
                text: '服务商品',
                children: data.typeData,
              },
              {
                id: 2,
                code: 2,
                name: '交易商品',
                text: '交易商品',
                children: [],
              },
            ]
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
      this.$emit('select', this.tab1, this.tab2, this.tabs)
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
      console.log('服务交易', item1, item2, item3)
      this.tab2.title = item3.text || item2.text || item1.text
      this.tab2.value = [item1?.code, item2?.code, item3?.code]
      this.change()
      this.$refs.tab2.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
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
</style>
