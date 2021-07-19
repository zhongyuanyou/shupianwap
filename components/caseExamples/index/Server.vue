<template>
  <div>
    <sp-tree-select
      height="65vw"
      :items="formatItems"
      :main-active-index.sync="mainActiveIndex"
      @click-nav="clickNav"
      @click-item="clickItem"
    >
      <template #content>
        <div class="service-select__content">
          <div
            v-for="item of childrenList"
            :key="item.text"
            class="service-select__item"
            :class="{
              'service-select__item--active': activeItem.id === item.id,
            }"
            @click="clickItem(item)"
          >
            <p>{{ item.text }}</p>
            <div
              v-show="activeItem.id === item.id"
              class="service-select__icon"
            >
              <my-icon name="yiguanzhu" color="#4974F5" size="0.28rem" />
            </div>
          </div>
        </div>
      </template>
    </sp-tree-select>
    <!-- <BottomConfirm
      @resetFilters="reset"
      @confirmFilters="confirm"
    ></BottomConfirm> -->
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, TreeSelect } from '@chipspc/vant-dgg'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect1.vue'
import BottomConfirm from '@/components/common/filters/BottomConfirm.vue'
import { goods } from '@/api/index'

import clone from '@/utils/clone'
import objectDiff from '@/utils/objectDiff'

export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [TreeSelect.name]: TreeSelect,
    // BottomConfirm,
    // ServiceSelect,
  },
  props: {
    level: {
      type: Number || String,
      default: 2,
    },
    items: {
      type: Array,
      default() {
        return [
          {
            text: '不限',
            id: '0',
            className: 'my-class',
            children: [
              {
                text: '不限',
                id: -1,
              },
            ],
          },
          {
            text: '工商服务',
            id: '1',
            className: 'my-class',
            children: [
              {
                text: '不限',
                id: -1,
              },
              {
                text: '有限公司注册',
                id: 1,
              },
              {
                text: '外资公司注册',
                id: 2,
                disabled: true,
              },
              {
                text: '印章',
                id: 3,
              },
              {
                text: '公司地址变更',
                id: 4,
              },
            ],
          },
        ]
      },
    },
  },

  data() {
    return {
      tab1: {},

      mainActiveIndex: 0,

      childrenList: [],

      activeItem: {},
    }
  },
  computed: {
    formatItems() {
      if (!Array.isArray(this.items)) return []
      const cloneItem = clone(this.items, true)
      console.log(cloneItem)
      return this.setData(cloneItem)
    },
  },
  watch: {
    formatItems(newVal) {
      this.reset()
    },
  },
  methods: {
    setData(list) {
      console.log('list', list)
      // list.unshift({
      //   id: -1,
      //   name: '不限',
      //   text: '不限',
      // })

      return list.map((item) => {
        item.text = item.name

        if (item.children) {
          item.children = this.setData(item.children)
        }
        return item
      })
    },
    clickNav(index) {
      console.log('clickNav', index)
      this.childrenList = this.formatItems[index]
        ? this.formatItems[index].children || []
        : []
      this.activeItem = this.childrenList.length > 0 ? this.childrenList[0] : {}
    },
    clickItem(item) {
      console.log('clickItem', item)

      this.activeItem = item
    },
    reset() {
      this.mainActiveIndex = 0
      this.childrenList =
        this.formatItems.length > 0 ? this.formatItems[0].children || [] : []
      this.activeItem = this.childrenList.length > 0 ? this.childrenList[0] : {}
      this.callback()
    },
    confirm() {
      this.callback()
    },
    callback() {
      if (this.formatItems.length > 0) {
        this.$emit(
          'select',
          this.formatItems[this.mainActiveIndex] || {},
          this.activeItem || {}
        )
      }
    },
  },
}
</script>
 <style lang="less" scoped>
// ::v-deep.sp-tree-select {
//   min-height: 200px;
//   max-height: 400px;
//   flex: 1 1;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   .sp-tree-select__nav {
//     flex: 190px 0 1;
//     .sp-sidebar-item {
//       padding: 30px 40px;
//       color: @text-main-color;
//       font-size: 28px;
//       font-weight: 400;
//       background-color: #f0f0f0;
//     }
//     .sp-sidebar-item--select {
//       color: @main-color;
//       font-weight: bold;
//       background-color: #ffffff;
//       &::before {
//         display: none;
//       }
//     }
//   }

//   .sp-tree-select__content .sp-sidebar-item {
//     background-color: #f8f8f8;
//   }
//   .sp-tree-select__content .sp-sidebar-item.sp-sidebar-item--select {
//     background-color: #ffffff;
//   }
// }
</style>
<style lang="less" scoped>
.service-select {
  background: #fff;
  display: flex;
  flex-direction: column;
  ::v-deep.sp-tree-select {
    min-height: 200px;
    max-height: 400px;
    flex: 1 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .sp-tree-select__nav {
      flex: 190px 0 1;
      .sp-sidebar-item {
        padding: 30px 40px;
        color: @text-main-color;
        font-size: 28px;
        font-weight: 400;
        background-color: #f0f0f0;
      }
      .sp-sidebar-item--select {
        color: @main-color;
        font-weight: bold;
        background-color: #f8f8f8;
        &::before {
          display: none;
        }
      }
    }
    .sp-tree-select__content {
      background-color: #f8f8f8;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 30px 40px;
    color: @text-main-color;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;
    &--active {
      color: @main-color;
      font-weight: bold;
    }
    p {
      flex: 1;
    }
  }
  .service-select__icon {
    width: 28px;
    height: 28px;

    font-weight: bold;
    background: #f8f8f8;
  }
}
</style>
